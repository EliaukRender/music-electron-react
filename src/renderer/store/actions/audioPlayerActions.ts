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
  setActiveSongUrl,
} from '@/renderer/store/modules/playerControlReducer';
import MessageToast from '@/renderer/components/MessageToast';

const { dispatch } = store;
const audio = new Audio();

/**
 * @description: 下一首
 * @param manualFlag ：true-手动点击下一首时，直接下一首； false-自然结束下一首时，要考虑musicMode
 */
export const playNextSong = async (manualFlag: boolean) => {
  const { activeSongList, activeSongId, musicMode } =
    store.getState().playerControl;
  console.log('playNextSong', musicMode);
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
  // 重置状态
  dispatch(setActiveSongId(nextSong.songId));
  dispatch(setActiveSongUrl(nextSong.songUrl));
  dispatch(setIsPlaying(false));
  dispatch(setIsPause(false));
  dispatch(setIsEnded(true));
  dispatch(setCurrentTime(0));
  dispatch(setDuration(0));
  // 播放
  await playAudio();
};

/**
 * @description: 获取频谱分析器
 */
let analyser: any = null;
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
 * @description: 准备播放
 * @param songId 歌曲的songId值
 */
export const playAudio = async (songId?: number) => {
  console.log('playAudio--songId', songId);
  // 让用户点击时才创建audioContext，否则会被浏览器策略限制
  if (!analyser) {
    createAnalyzer();
  }
  const { activeSongId, activeSongList } = store.getState().playerControl;
  console.log('playAudio--activeSongList', activeSongList);

  /* 1、指定一首新歌开始播放 */
  if (songId && songId !== activeSongId) {
    console.log('指定新歌播放');
    const song = activeSongList.find((item: any) => item.songId === songId);
    PlayNewAudio({ songId, songUrl: song.url });
    return;
  }

  /* 2、暂停后继续播放 */
  if (store.getState().audioPlayer.isPause && activeSongId) {
    console.log('暂停后播放');
    audio.currentTime = store.getState().audioPlayer.currentTime;
    try {
      audio
        .play()
        .then(() => {
          dispatch(setIsPlaying(true));
          dispatch(setIsPause(false));
        })
        .catch(() => {
          console.log('audio.play() error');
        });
    } catch (e) {
      console.log('e', e);
    }
    return;
  }

  /* 3、播放队列中的歌曲 */
  if (activeSongList.length) {
    PlayNewAudio({
      songId: activeSongList[0].songId,
      songUrl: activeSongList[0].songUrl,
    });
  } else {
    MessageToast.warning('暂无歌曲音频，请刷新页面后重试');
  }
};

/**
 * @description: 正式播放 (基于一首新的歌曲)
 * @param
 */
const PlayNewAudio = ({
  songId,
  songUrl,
}: {
  songId: number;
  songUrl: string;
}) => {
  console.log('readyPlayAudio');
  if (!songId || !songUrl) return;
  try {
    audio.src = songUrl;
    audio.volume = store.getState().audioPlayer.volume / 100;
    audio.playbackRate = store.getState().audioPlayer.playbackRate;
    audio
      .play()
      .then(() => {
        console.log('当前歌曲时长：', audio.duration);
        dispatch(setActiveSongUrl(songUrl));
        dispatch(setActiveSongId(songId));
        dispatch(setIsEnded(false));
        dispatch(setIsPlaying(true));
        dispatch(setIsPause(false));
        dispatch(setDuration(audio.duration));
      })
      .catch(() => {
        MessageToast.warning('歌曲播放失败');
      });
  } catch (error) {
    console.error('播放失败', error);
  }
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
  const ADD_TIME = 5;
  const { duration, currentTime } = store.getState().audioPlayer;
  const lastTime = currentTime + ADD_TIME;
  // 歌曲直接结束，开始下一首
  if (lastTime >= duration) {
    resetAudioStatus();
    playNextSong(false);
    return;
  }
  audio.currentTime = lastTime;
};

/**
 * @description: 歌曲结束时，重置状态
 */
const resetAudioStatus = () => {
  dispatch(setIsEnded(true));
  dispatch(setIsPlaying(false));
  dispatch(setIsPause(false));
  dispatch(setActiveSongUrl(''));
  dispatch(setCurrentTime(0));
  dispatch(setDuration(0));
};

/**
 * @description: 歌曲播放完毕
 */
audio.addEventListener('ended', () => {
  console.log('歌曲播放完毕');
  resetAudioStatus();
  // 	自动下一首
  playNextSong(false);
});

/**
 * @description: 歌曲当前播放时间，实时保存
 */
audio.addEventListener('timeupdate', () => {
  // console.log('当前时间', audio.currentTime);
  dispatch(setCurrentTime(audio.currentTime));
});

/**
 * @description: 后退: 固定后退5s
 */
export const decreaseCurrentTime = () => {
  const DECREASE_TIME = -5;
  const { currentTime } = store.getState().audioPlayer;
  const lastTime = currentTime + DECREASE_TIME;
  // 歌曲从0开始播放
  if (lastTime <= 0) {
    audio.currentTime = 0;
    return;
  }
  audio.currentTime = lastTime;
};

/**
 * @description: 暂停歌曲
 */
export const pauseAudio = () => {
  console.log('pauseAudio');
  audio.pause();
  dispatch(setIsPlaying(false));
  dispatch(setIsPause(true));
};

/**
 * @description: 上一首
 */
export const playPreSong = async () => {
  console.log('playPreSong');
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
  // 重置状态
  dispatch(setActiveSongId(preSong.songId));
  dispatch(setActiveSongUrl(preSong.songUrl));
  dispatch(setIsPlaying(false));
  dispatch(setIsPause(false));
  dispatch(setIsEnded(true));
  dispatch(setCurrentTime(0));
  dispatch(setDuration(0));
  // 播放
  await playAudio();
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
  audio.currentTime = curTime;
};
