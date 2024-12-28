import React, { memo } from 'react';
import { RootState } from '@/renderer/store';
import { AnalyzeChartList } from '@/renderer/constant';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/renderer/store/modules/analyzeReducer';
import { AnalyzeChartStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeChartStyles';
import bars from '@/renderer/assets/images/analyzeImage/bars.png';
import lightBars from '@/renderer/assets/images/analyzeImage/lightBars.png';
import doubleBars from '@/renderer/assets/images/analyzeImage/doubleBars.png';
import none from '@/renderer/assets/images/analyzeImage/none.png';

const imageList = [bars, lightBars, doubleBars, none];

/**
 * @description: 频谱图动效样式
 */
const AnalyzeChart = () => {
  const dispatch = useDispatch();
  const { canvasOptions } = useSelector(
    (state: RootState) => ({
      canvasOptions: state.analyze.canvasOptions,
    }),
    shallowEqual,
  );

  return (
    <AnalyzeChartStyles>
      <div className="title">动效样式</div>
      <div className="chart-box">
        {AnalyzeChartList.map((item: any) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                dispatch(setMode(item.mode));
              }}
            >
              <div className="item">
                <img className="img" src={imageList[1]} alt="" />
                {canvasOptions.mode === item.mode && (
                  <i className="iconfont icon-duigou1 checked"></i>
                )}
                <div className="name">{item.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AnalyzeChartStyles>
  );
};

export default memo(AnalyzeChart);
