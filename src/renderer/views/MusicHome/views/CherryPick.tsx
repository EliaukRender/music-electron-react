import { memo, useCallback, useEffect, useState } from 'react';
import { CherryPickStyles } from '@/renderer/views/MusicHome/styles/CherryPickStyles';
import { handleQueryMusicHomeSheet } from '@/renderer/store/actions/musicHomeActions';
import CarouselRecommend from '@/renderer/views/MusicHome/components/cherryPickCmp/CarouselRecommend';

/**
 * @description: 音乐馆---精选
 */
const CherryPick = memo((props) => {
  const [totalSheetData, setTotalSheetData] = useState<any[]>([]); // 精选页面所有的歌单数据

  // 获取精选页面的所有歌单
  const getCherryPickSheet = useCallback(async () => {
    const data: any[] | undefined = await handleQueryMusicHomeSheet();
    data?.length && setTotalSheetData(data);
    console.log('data', data);
  }, []);

  /**
   * 初始化数据
   */
  useEffect(() => {
    getCherryPickSheet();
  }, [getCherryPickSheet]);

  return (
    <CherryPickStyles>
      {/* 首页推荐--轮播的歌单 */}
      <CarouselRecommend
        sheetList={totalSheetData[0]?.grouped_data}
      ></CarouselRecommend>

      {/* 推荐的不同风格的歌单 */}
    </CherryPickStyles>
  );
});

export default CherryPick;
