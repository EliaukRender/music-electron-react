/* eslint-disable react/no-array-index-key */

import React, { memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AnalyzeColorStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeColorStyles';
import { RootState } from '@/renderer/store';
import { hexToRgba } from '@/renderer/utils/color/transformColor';
import { setColors } from '@/renderer/store/modules/analyzeReducer';
import { AnalyzeColorList } from '@/renderer/constant';

/**
 * @description: 频谱图的颜色选择组件
 */
const AnalyzeColors = () => {
  const dispatch = useDispatch();
  const { canvasOptions } = useSelector(
    (state: RootState) => ({
      canvasOptions: state.analyze.canvasOptions,
    }),
    shallowEqual,
  );

  return (
    <AnalyzeColorStyles>
      <div className="title">动效颜色</div>
      <div className="colors-box">
        {AnalyzeColorList.map((item: any) => {
          return (
            <div
              key={item.id}
              className="color-item"
              style={
                item.colors[0] === canvasOptions.colors[0]
                  ? {
                      boxShadow: `0 0 2px 3px ${hexToRgba(item.colors[0], 0.6)}`,
                    }
                  : {}
              }
              onClick={() => {
                dispatch(setColors(item.colors));
              }}
            >
              {item.colors.map((color: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="color"
                    style={{ backgroundColor: color }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AnalyzeColorStyles>
  );
};

export default memo(AnalyzeColors);
