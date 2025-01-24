import { memo, useCallback, useMemo, useRef, useState } from 'react';
import NormalSheetCard from '@/renderer/views/MusicHome/components/cherryPickCmp/NormalSheetCard';
import { NormalRecommendStyles } from '@/renderer/views/MusicHome/styles/NormalRecommendStyles';
import { useResizeObserve } from '@/renderer/hooks/useResizeObserve';

interface IProps {
  sheetList: any[];
  collectionName: string;
}
/**
 * @description: 音乐馆-精选-非轮播形式的推荐歌单列表
 */
const NormalRecommend = memo(({ sheetList, collectionName }: IProps) => {
  const normalRef = useRef<HTMLDivElement | null>(null);
  const CARD_COUNT = 6; // 显示的卡片数量
  const MARGIN_RIGHT = 20; // margin-right值
  const [cardWidthHeight, setCardWidthHeight] = useState(140); // NormalSheetCard的宽高

  /**
   * 计算 NormalSheetCard 的宽高
   */
  const computeCardWidth = useCallback(() => {
    if (!normalRef.current) return;
    const widthHeightValue =
      (normalRef.current.clientWidth - MARGIN_RIGHT * (CARD_COUNT - 1)) /
      CARD_COUNT;
    setCardWidthHeight(widthHeightValue);
  }, []);

  useResizeObserve(normalRef, computeCardWidth); // 监听页面元素大小变化

  return (
    <NormalRecommendStyles ref={normalRef}>
      <div className="normal-recommend">
        <div className="collection-name">{collectionName}</div>
        <div className="list">
          {sheetList.map((sheetInfo, index) => {
            return (
              <div
                style={{
                  width: `${cardWidthHeight}px`,
                  height: `${cardWidthHeight}px`,
                  marginRight: `${index !== sheetList.length - 1 ? MARGIN_RIGHT : 0}px`,
                }}
              >
                <NormalSheetCard
                  key={index}
                  sheetInfo={sheetInfo}
                ></NormalSheetCard>
              </div>
            );
          })}
        </div>
      </div>
    </NormalRecommendStyles>
  );
});

export default NormalRecommend;
