import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CherryPickStyles } from '@/renderer/views/MusicHome/styles/CherryPickStyles';
import { handleQueryMusicHomeSheet } from '@/renderer/store/actions/musicHomeActions';
import CarouselRecommend from '@/renderer/views/MusicHome/components/cherryPickCmp/CarouselRecommend';
import NormalRecommend from '@/renderer/views/MusicHome/components/cherryPickCmp/NormalRecommend';

/**
 * @description: 音乐馆---精选
 */
const CherryPick = memo((props) => {
  const [totalSheetData, setTotalSheetData] = useState<any[]>([]); // 精选页面所有的歌单数据

  // 获取精选页面的所有歌单
  const getCherryPickSheet = useCallback(async () => {
    const data: any[] | undefined = await handleQueryMusicHomeSheet();
    data?.length && setTotalSheetData(data);
  }, []);

  // 轮播形式歌单列表
  const carouseSheetList = useMemo(() => {
    return totalSheetData[0]?.grouped_data;
  }, [totalSheetData]);

  // 非轮播形式的推荐歌单
  const normalSheetList = useMemo(() => {
    return totalSheetData.filter((item) => item.collectionId !== 1);
  }, [totalSheetData]);

  /**
   * 初始化数据
   */
  useEffect(() => {
    getCherryPickSheet();
  }, [getCherryPickSheet]);

  return (
    <CherryPickStyles>
      {/* 首页推荐--轮播的歌单 */}
      <CarouselRecommend sheetList={carouseSheetList}></CarouselRecommend>

      {/* 推荐的不同风格的歌单 */}
      {normalSheetList.map((item, index) => {
        return (
          <NormalRecommend
            key={index}
            sheetList={item.grouped_data}
            collectionName={item.collectionName}
          ></NormalRecommend>
        );
      })}
    </CherryPickStyles>
  );
});

export default CherryPick;
