import store from '@/renderer/store';
import {
  setCurrentTime,
  setDuration,
  setIsEnded,
  setIsMuted,
  setIsPause,
  setIsPlaying,
  setPlaybackRate,
  setVolume,
} from '@/renderer/store/modules/audioPlayerReducer';
import {
  setActiveSongId,
  setActiveSongList,
  setActiveSongUrl,
  setIsLoadingSong,
} from '@/renderer/store/modules/playerControlReducer';
import MessageToast from '@/renderer/components/MessageToast';
import Emitter from '@/renderer/eventBus/event-emitter';
import { LyricInteraction } from '@/renderer/eventBus/modules/lyricInteraction';

const { dispatch } = store;
export const audio = new Audio();
let analyser: any = null;

/**
 * @description: 获取频谱分析器
 */
export const getAnalyser = () => {
  return analyser;
};

/**
 * @description: 创建频谱分析器
 */
const createAnalyzer = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // 创建处理音频的对象
  analyser = audioContext.createAnalyser(); // 创建频谱分析对象
  analyser.fftSize = store.getState().analyze.canvasOptions.fftSize; // 频谱分析的精度
  const audioSrc = audioContext.createMediaElementSource(audio); // 指定音频源
  audioSrc.connect(analyser); // 音频源连接到分析器
  analyser.connect(audioContext.destination); // 分析器连接到音频输出设备
};

/**
 * @description: 播放歌曲
 * @param song 歌曲信息
 * @param songList 播放歌曲所在的歌曲列表
 */
export const playSong = async (song?: any, songList?: any[]) => {
  if (store.getState().playerControl.isLoadingSong) return;
  dispatch(setIsLoadingSong(true)); // 加载歌曲中
  console.log('playAudio--song', song);
  // 让用户点击时才创建audioContext，否则会被浏览器策略限制
  if (!analyser) {
    createAnalyzer();
  }
  // 1、点击一首歌曲播放
  if (song) {
    resetAudioStatus();
    songList?.length && dispatch(setActiveSongList(songList)); // 更新播放队列
    dispatch(setActiveSongId(song.songId)); // 更新歌曲id
    playAudio({ songId: song.songId, songUrl: song.songUrl }); // 播放音频
    return;
  }
  // 2、暂停后继续播放 / 点击播放按钮
  const { activeSongId, activeSongUrl } = store.getState().playerControl;
  if (activeSongId && activeSongUrl) {
    playAudio({ songId: activeSongId, songUrl: activeSongUrl });
    return;
  }
  MessageToast.warning('请选择歌曲播放');
};

/**
 * @description: 播放音频
 */

const playAudio = ({
  songId,
  songUrl,
  currentTime,
  volume,
  playbackRate,
}: {
  songId: number;
  songUrl: string;
  currentTime?: number;
  volume?: number;
  playbackRate?: number;
}) => {
  if (!songId && !songUrl) return;
  audio.src = songUrl || store.getState().playerControl.activeSongUrl;
  audio.currentTime = currentTime || store.getState().audioPlayer.currentTime;
  audio.volume = volume || store.getState().audioPlayer.volume / 100;
  audio.playbackRate =
    playbackRate || store.getState().audioPlayer.playbackRate;
  audio
    .play()
    .then(() => {
      dispatch(setActiveSongId(songId));
      dispatch(setActiveSongUrl(songUrl)); // 歌曲地址
      dispatch(setDuration(audio.duration)); // 歌曲总时长
      dispatch(setIsEnded(false)); // 未结束
      dispatch(setIsPlaying(true)); // 正在播放
      dispatch(setIsPause(false)); // 没有暂停
      dispatch(setIsLoadingSong(false)); // 歌曲加载完毕
    })
    .catch(() => {
      MessageToast.warning('歌曲播放失败');
      dispatch(setIsLoadingSong(false)); // 歌曲加载完毕
    });
};

/**
 * @description: 下一首
 * @param manualFlag ：true-手动点击下一首时，直接下一首； false-自然结束下一首时，要考虑musicMode
 */
export const playNextSong = async (manualFlag: boolean) => {
  if (store.getState().playerControl.isLoadingSong) return;
  dispatch(setIsLoadingSong(true)); // 加载歌曲中
  const { activeSongList, activeSongId, musicMode } =
    store.getState().playerControl;
  let nextSong;
  /* 顺序播放、 单曲循环时主动下一首 */
  if (musicMode === 1 || (musicMode === 3 && manualFlag)) {
    let index = activeSongList?.findIndex(
      (item) => item.songId === activeSongId,
    );
    index = index === activeSongList.length - 1 ? 0 : index + 1; // 是否最后一首
    nextSong = activeSongList[index]; // 找到下一首
  }
  /* 随机播放 */
  if (musicMode === 2) {
    nextSong = getRandomSong(activeSongList, activeSongId);
  }
  /* 单曲循环且不是主动切换 */
  if (musicMode === 3 && !manualFlag) {
    nextSong = activeSongList?.find((item) => item.songId === activeSongId);
  }
  // 重置数据
  resetAudioStatus();
  // 播放音频
  playAudio({
    songId: nextSong.songId,
    songUrl: nextSong.songUrl,
  });
};

/**
 * @description: 上一首
 */
export const playPreSong = async () => {
  if (store.getState().playerControl.isLoadingSong) return;
  dispatch(setIsLoadingSong(true)); // 加载歌曲中
  const { activeSongList, activeSongId, musicMode } =
    store.getState().playerControl;
  let preSong;
  /* 顺序播放模式 或者 单曲循环模式 */
  if (musicMode === 1 || musicMode === 3) {
    let index = activeSongList.findIndex(
      (item: any) => item.songId === activeSongId,
    );
    index = index === 0 ? activeSongList.length - 1 : index - 1; // 是否第一首
    preSong = activeSongList[index]; // 找到上一首
  }
  /* 随机播放模式  */
  if (musicMode === 2) {
    preSong = getRandomSong(activeSongList, activeSongId);
  }
  // 重置数据
  resetAudioStatus();
  // 播放音频
  playAudio({
    songId: preSong.songId,
    songUrl: preSong.songUrl,
  });
};

/**
 * @description: 歌曲结束时，重置状态
 */
const resetAudioStatus = () => {
  dispatch(setActiveSongUrl('')); // 歌曲url
  dispatch(setDuration(0)); // 总时长
  dispatch(setCurrentTime(0)); // 当前播放时间
  dispatch(setIsEnded(true)); // 已结束
  dispatch(setIsPause(false)); // 未暂停
  dispatch(setIsPlaying(false)); // 未正在播放
};

/**
 * @description: 实现随机效果
 * @param songList  当前歌曲列表
 * @param songId 当前歌曲的id
 * @return songList[randomIndex] 随机歌曲信息
 */
const getRandomSong = (songList: any, songId: number | null) => {
  if (!songId || !songList.length) return;
  if (songList.length === 1) {
    return 0; // 如果只有一首歌，直接返回索引0
  }
  let randomIndex = Math.floor(Math.random() * songList.length);
  // 如果随机到的索引与上次播放的索引相同，重新生成，直到不同为止
  const curSongIndex = songList.findIndex(
    (item: any) => item.songId === songId,
  );
  if (randomIndex === curSongIndex) {
    randomIndex = Math.floor(Math.random() * songList.length);
    console.log('randomIndex', randomIndex);
  }
  return songList[randomIndex];
};

/**
 * @description: 改变音频的播放速率
 */
export const changePlaybackRate = (playbackRate: number) => {
  audio.playbackRate = playbackRate;
  dispatch(setPlaybackRate(playbackRate));
};

/**
 * @description: 前进: 固定前进5s
 */
export const addCurrentTime = () => {
  if (store.getState().playerControl.isLoadingSong) return;
  const ADD_TIME = 5;
  const { duration, currentTime } = store.getState().audioPlayer;
  const lastTime = currentTime + ADD_TIME;
  // 歌曲直接结束，开始下一首
  if (lastTime >= duration) {
    resetAudioStatus();
    playNextSong(false);
    return;
  }
  dispatch(setCurrentTime(lastTime));
  audio.currentTime = lastTime;
  Emitter.emit(LyricInteraction.change_current_time, lastTime);
};

/**
 * @description: 后退: 固定后退5s
 */
export const decreaseCurrentTime = () => {
  if (store.getState().playerControl.isLoadingSong) return;
  const DECREASE_TIME = -5;
  pauseAudio();
  const { currentTime } = store.getState().audioPlayer;
  const lastTime = currentTime + DECREASE_TIME;
  // 歌曲从0开始播放
  if (lastTime <= 0) {
    audio.currentTime = 0;
    return;
  }
  dispatch(setCurrentTime(lastTime));
  audio.currentTime = lastTime;
  Emitter.emit(LyricInteraction.change_current_time, lastTime);
};

/**
 * @description: 暂停歌曲
 */
export const pauseAudio = () => {
  if (store.getState().playerControl.isLoadingSong) return;
  audio.pause();
  dispatch(setIsPlaying(false));
  dispatch(setIsPause(true));
};

/**
 * @description: 调节音量
 * @param curVol 当前音量值
 */
export const changeVolume = (curVol: number) => {
  if (curVol <= 0) {
    dispatch(setVolume(0));
    dispatch(setIsMuted(true));
    audio.muted = true;
    return;
  }
  dispatch(setIsMuted(false));
  dispatch(setVolume(curVol)); // 保存最新音量
  audio.volume = curVol / 100; // 调节音量
  audio.muted = false;
};

/**
 * @description: 调节播放时间
 */
export const changeCurrentTime = (curTime: number) => {
  if (store.getState().playerControl.isLoadingSong) return;
  audio.currentTime = curTime;
};

/**
 * @description: 监听音频当前播放时间
 */
audio.addEventListener('timeupdate', () => {
  // console.log('当前时间', audio.currentTime);
  dispatch(setCurrentTime(audio.currentTime));
});

/**
 * @description: 监听音频播放完毕
 */
audio.addEventListener('ended', () => {
  console.log('歌曲播放完毕');
  resetAudioStatus();
  // 	自动下一首
  playNextSong(false);
});
