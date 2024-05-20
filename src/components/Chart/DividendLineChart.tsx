'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  TOP_PADDING,
  TDrawChart,
  TLineChartData,
  TYAxisConfiguration,
} from '.';
import { useChartInfo } from './hooks';

export type TDividendChartData = TLineChartData & { dividend: number | null };

type DividendLineChartProps = {
  yConfig: TYAxisConfiguration;
  dataList: TLineChartData[];
  dividendDataList: TDividendChartData[];
};

type DrawLineChartProps = TDrawChart & {
  dividendDataList: TDividendChartData[];
};

type Tooltip = {
  x: number;
  y: number;
  value: number | null;
  dividend: number | null;
};

const drawLineChart = ({
  canvasHeight,
  canvasWidth,
  chartHeight,
  chartWidth,
  ctx,
  yAxisValueList,
  dividendDataList,
  yConfig,
}: DrawLineChartProps) => {
  const { maxValue, minValue, tickCount, yScale } = yConfig;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.fillStyle = '#C7C7CC';
  ctx.strokeStyle = '#E5E5EA';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';

  ctx.moveTo(0, TOP_PADDING);
  ctx.lineTo(chartWidth, TOP_PADDING);
  ctx.lineTo(chartWidth, chartHeight + TOP_PADDING);
  ctx.lineTo(0, chartHeight + TOP_PADDING);
  ctx.stroke();

  for (let i = 0; i <= tickCount; i++) {
    const absoluteValue = i * yScale;
    const displayValue = absoluteValue + minValue;
    const yPoint =
      chartHeight - (absoluteValue / (maxValue - minValue)) * chartHeight;
    ctx.fillText(displayValue.toString(), canvasWidth, yPoint + TOP_PADDING);
  }

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(21, 65, 107, 0.3)';
  ctx.lineWidth = 1.5;

  yAxisValueList.forEach((point, index) => {
    const x = index * (chartWidth / (yAxisValueList.length - 1));
    const y =
      chartHeight - ((point - minValue) / (maxValue - minValue)) * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y + TOP_PADDING);
    } else {
      ctx.lineTo(x, y + TOP_PADDING);
    }
  });

  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#15416B';
  dividendDataList.forEach((point, index) => {
    const x = index * (chartWidth / (dividendDataList.length - 1));
    const y =
      chartHeight -
      ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y + TOP_PADDING);
    } else {
      ctx.lineTo(x, y + TOP_PADDING);
    }
  });
  ctx.stroke();
};

const calculateTooltipPosition = (
  tooltip: Tooltip,
  canvasWidth: number,
  canvasHeight: number,
): { left: number; top: number } => {
  const margin = 10;
  const tooltipWidth = 100; // 툴팁의 가로 길이
  const tooltipHeight = 50; // 툴팁의 세로 길이
  let left: number, top: number;

  if (tooltip.x < canvasWidth / 2 && tooltip.y < canvasHeight / 2) {
    // 좌측 상단
    left = tooltip.x + margin;
    top = tooltip.y + margin;
  } else if (tooltip.x >= canvasWidth / 2 && tooltip.y < canvasHeight / 2) {
    // 우측 상단
    left = tooltip.x - margin - tooltipWidth;
    top = tooltip.y + margin;
  } else if (tooltip.x >= canvasWidth / 2 && tooltip.y >= canvasHeight / 2) {
    // 우측 하단
    left = tooltip.x - margin - tooltipWidth;
    top = tooltip.y - margin - tooltipHeight;
  } else {
    // 좌측 하단
    left = tooltip.x + margin;
    top = tooltip.y - margin - tooltipHeight;
  }

  return { left, top };
};

const DividendLineChart = ({
  dataList,
  dividendDataList,
  yConfig,
}: DividendLineChartProps) => {
  const canvasAreaRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [points, setPoints] = useState<
    { x: number; y: number; value: number; dividend: number | null }[]
  >([]);

  const { setCanvas, canvasSize } = useChartInfo();

  const updateDimensions = useCallback(() => {
    if (!canvasAreaRef.current) return;
    const screenWidth = canvasAreaRef.current.offsetWidth;
    const screenHeight = canvasAreaRef.current.offsetHeight;
    const isLandscape = screenWidth > screenHeight;
    const newHeight = screenWidth * (3 / 4);
    setCanvas({ screenWidth, calculatedHeight: newHeight });
  }, [setCanvas]);

  useEffect(() => {
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
        const { canvasHeight, canvasWidth, chartHeight, chartWidth } =
          canvasSize;
        const dpr = window.devicePixelRatio;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(dpr, dpr);
        drawLineChart({
          ctx,
          canvasWidth,
          canvasHeight,
          chartWidth,
          chartHeight,
          yAxisValueList: dataList.map((v) => Number(v.value)),
          dividendDataList: dividendDataList,
          yConfig,
        });

        const newPoints = dividendDataList
          .map((point, index) => {
            const x = index * (chartWidth / (dividendDataList.length - 1));
            const y =
              chartHeight -
              ((point.value - yConfig.minValue) /
                (yConfig.maxValue - yConfig.minValue)) *
                chartHeight;
            return {
              x: x,
              y: y + TOP_PADDING,
              value: point.value,
              dividend: point.dividend,
            };
          })
          .filter((v) => v.dividend);
        setPoints(newPoints);
      }
    }
  }, [canvasSize, dataList, dividendDataList, yConfig]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (tooltip) {
        setTooltip(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [tooltip]);

  return (
    <figure
      ref={canvasAreaRef}
      className="w-full flex"
      style={{ position: 'relative' }}
    >
      <canvas ref={canvasRef} className="" draggable />
      {points.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: point.x - 5,
            top: point.y - 5,
            width: 10,
            height: 10,
            backgroundColor: '#15416B',
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setTooltip({
              x: point.x,
              y: point.y,
              value: point.dividend,
              dividend: point.dividend,
            });
          }}
        />
      ))}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            ...calculateTooltipPosition(
              tooltip,
              canvasSize.canvasWidth,
              canvasSize.canvasHeight,
            ),
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <div>날짜: 3/21</div>
          <div>가격: ₩{tooltip.value}</div>
        </div>
      )}
      <figcaption className="hidden">보이지 않는 값</figcaption>
    </figure>
  );
};

export default DividendLineChart;
