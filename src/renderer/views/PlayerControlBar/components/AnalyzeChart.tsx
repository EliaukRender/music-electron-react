import React, { memo } from 'react';
import { RootState } from '@/renderer/store';
import { AnalyzeChartList } from '@/renderer/constant';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/renderer/store/modules/analyzeReducer';
import { AnalyzeChartStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeChartStyles';
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
                <img className="img" src={item.chartImg} alt="" />
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
