import { memo, useRef } from 'react';
import { NormalSheetCardStyles } from '@/renderer/views/MusicHome/styles/NormalSheetCardStyles';
import { motion, useAnimationControls } from 'framer-motion';

interface IProps {
  sheetInfo: any;
}

/**
 * @description: 音乐馆-精选-歌单卡片
 */
const NorSheetCard = memo(({ sheetInfo }: IProps) => {
  const songCardRef = useRef<HTMLDivElement | null>(null);

  const controls = useAnimationControls();

  const staticMove = {
    static: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    move: { y: -5, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const showHidden = {
    show: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 0.3 } },
  };

  // 鼠标进入
  const onMouseEnter = () => {
    controls.start('show');
    controls.start('move');
  };

  // 鼠标离开
  const onMouseLeave = () => {
    controls.start('static');
    controls.start('hidden');
  };

  return (
    <NormalSheetCardStyles>
      <motion.div
        className="normal-sheet-card"
        ref={songCardRef}
        animate={controls}
        variants={staticMove}
        initial="static"
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        <img className="image" src={sheetInfo.sheetImage} alt="" />
        <motion.div
          className="mask"
          initial="hidden"
          variants={showHidden}
          animate={controls}
        ></motion.div>
        <i className="iconfont icon-icon_qqyinyue"></i>
        <motion.div
          className="play-btn"
          initial="hidden"
          variants={showHidden}
          animate={controls}
        >
          <i className="iconfont icon-bofang"></i>
        </motion.div>
      </motion.div>
      <div className="sheetInfo-name">{sheetInfo?.songName}</div>
    </NormalSheetCardStyles>
  );
});

export default NorSheetCard;
