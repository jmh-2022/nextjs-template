'use client';

import { useState, useCallback } from 'react';
import {
  TUseCanvasSize,
  TCanvasSize,
  TCanvasAreaWH,
  YAXIS_PADDING,
  XAXIS_PADDING,
  TOP_PADDING,
} from '..';

export const useChartInfo = (): TUseCanvasSize => {
  const [canvasSize, setCanvasSize] = useState<TCanvasSize>({
    canvasWidth: 0,
    canvasHeight: 0,
    chartWidth: 0,
    chartHeight: 0,
  });

  const setCanvas = useCallback(
    ({ screenWidth, calculatedHeight }: TCanvasAreaWH) => {
      const chartWidth = screenWidth - YAXIS_PADDING;
      const chartHeight = calculatedHeight - XAXIS_PADDING - TOP_PADDING;
      setCanvasSize({
        canvasWidth: screenWidth,
        canvasHeight: calculatedHeight,
        chartWidth,
        chartHeight,
      });
    },
    [],
  );

  return {
    canvasSize,
    setCanvas,
  };
};
