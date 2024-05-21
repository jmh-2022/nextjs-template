'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  TUseCanvasSize,
  TCanvasSize,
  TCanvasAreaWH,
  YAXIS_PADDING,
  XAXIS_PADDING,
  TOP_PADDING,
} from '..';

export const useChartInfo = (): TUseCanvasSize => {
  const canvasContainerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [canvasSize, setCanvasSize] = useState<TCanvasSize>({
    canvasWidth: 0,
    canvasHeight: 0,
    chartWidth: 0,
    chartHeight: 0,
  });

  const updateCanvasSize = useCallback(
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

  const updateDimensions = useCallback(() => {
    if (!canvasContainerRef.current) return;
    const screenWidth = canvasContainerRef.current.offsetWidth;
    const screenHeight = canvasContainerRef.current.offsetHeight;
    const isLandscape = screenWidth > screenHeight;
    const newHeight = screenWidth * (3 / 4);
    updateCanvasSize({ screenWidth, calculatedHeight: newHeight });
  }, [updateCanvasSize]);

  useEffect(() => {
    // const debouncedUpdateDimensions = () => debounce(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const { canvasHeight, canvasWidth } = canvasSize;
        const dpr = window.devicePixelRatio;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(dpr, dpr);
        setCtx(ctx);
      }
    }
  }, [canvasSize]);

  return {
    ctx,
    canvasSize,
    updateCanvasSize,
    canvasContainerRef,
    canvasRef,
  };
};
