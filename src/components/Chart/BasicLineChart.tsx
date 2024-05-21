'use client';

import React, { useEffect } from 'react';

import {
  TDrawChart,
  TDrawChartEvent,
  TLineChartData,
  TOP_PADDING,
  TYAxisConfiguration,
  XAXIS_PADDING,
} from '.';
import { useChartInfo } from './hooks';

type LineChartProps = {
  yConfig: TYAxisConfiguration;
  dataList: TLineChartData[];
};

const drawLineChart = ({
  canvasHeight,
  canvasWidth,
  chartHeight,
  chartWidth,
  ctx,
  yAxisValueList,
  yConfig,
}: TDrawChart) => {
  // 그래프의 최대 최소 값, y 기준축 개수, 나눔 값
  const { maxValue, minValue, tickCount, yScale } = yConfig;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.setLineDash([]);
  // 캔버스 border !!
  // ctx.beginPath();
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = 'blue';
  // ctx.moveTo(0, 0);
  // ctx.lineTo(canvasWidth, 0);
  // ctx.lineTo(canvasWidth, canvasHeight);
  // ctx.lineTo(0, canvasHeight);
  // ctx.stroke();
  // 캔버스 border !!

  // 차트 border !!
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.fillStyle = '#C7C7CC';
  ctx.strokeStyle = '#E5E5EA';
  ctx.textAlign = 'right';
  // ctx.text = 'right';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';

  let isZeroInclude = false;
  ctx.moveTo(0, TOP_PADDING);
  ctx.lineTo(chartWidth, TOP_PADDING);
  // Y축 그리기
  // ctx.moveTo(chartWidth, TOP_PADDING);
  ctx.lineTo(chartWidth, chartHeight + TOP_PADDING);
  ctx.lineTo(0, chartHeight + TOP_PADDING);
  ctx.stroke();
  // 차트 border !!

  // TODO: 껍데기 그리는거랑 차트 그리는 기능을 나눠 보자
  for (let i = 0; i <= tickCount; i++) {
    // 절대 값 Y축 기준 그리기 위해 사용
    const absoluteValue = i * yScale;
    // 화면에 보여질 값
    const displayValue = absoluteValue + minValue;
    // 제일 아래부터 그려 나간다
    const yPoint =
      chartHeight - (absoluteValue / (maxValue - minValue)) * chartHeight;

    ctx.fillText(displayValue.toString(), canvasWidth, yPoint + TOP_PADDING);
  }

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = '#15416B';
  ctx.lineWidth = 2;

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
};

const drawPointAndLines = ({
  x,
  y,
  ctx,
  canvasSize,
  dataList,
  yConfig,
}: TDrawChartEvent) => {
  const { chartHeight, chartWidth, canvasWidth, canvasHeight } = canvasSize;
  if (x < 0 || x > chartWidth) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawLineChart({
    ctx,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    chartWidth,
    chartHeight,
    yAxisValueList: dataList.map((v) => Number(v.value)),
    yConfig,
  });

  // 차트의 (전체 width) / (그려진 차트 개수) = 차트 범위
  const widthScale = chartWidth / (dataList.length - 1);
  // 선택된 위치 / 차트 범위 = 몇 번재 범위에 있는 지 나옴 (index);
  const index = Math.round(x / widthScale);

  //
  const closestX = index * widthScale;
  const closestY =
    chartHeight -
    ((Number(dataList[index].value) - yConfig.minValue) /
      (yConfig.maxValue - yConfig.minValue)) *
      chartHeight;
  ctx.beginPath();
  ctx.arc(closestX, closestY + TOP_PADDING, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#15416B';
  ctx.lineWidth = 0.5;
  ctx.fill();

  ctx.strokeStyle = 'grey';
  ctx.textAlign = 'center';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(closestX, TOP_PADDING);
  ctx.lineTo(closestX, chartHeight + TOP_PADDING);

  ctx.textBaseline = 'top';
  // 날짜
  ctx.fillText(
    dataList[index].label.toString(),
    closestX,
    canvasHeight - XAXIS_PADDING + 5,
  );
  ctx.stroke();
  // 금액 또는 수익률
  ctx.beginPath();
  ctx.textAlign = 'right';

  ctx.fillText(
    dataList[index].value.toString(),
    canvasWidth,
    closestY + TOP_PADDING,
  );

  ctx.stroke();
  // 금액 또는 수익률
};

const BasicLineChart = ({ dataList, yConfig }: LineChartProps) => {
  const { canvasSize, ctx, canvasContainerRef, canvasRef, updateCanvasSize } =
    useChartInfo();

  const handleClick = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let x: number;
    let y: number;
    if ('clientY' in e) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      throw new Error('등록되지 않은 디바이스입니다.');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawPointAndLines({ ctx, x, y, canvasSize, dataList, yConfig });
  };

  useEffect(() => {
    if (ctx) {
      const { canvasHeight, canvasWidth, chartHeight, chartWidth } = canvasSize;
      drawLineChart({
        ctx,
        canvasWidth,
        canvasHeight,
        chartWidth,
        chartHeight,
        yAxisValueList: dataList.map((v) => Number(v.value)),
        yConfig,
      });
    }
  }, [canvasSize, ctx, dataList, yConfig]);

  return (
    <figure ref={canvasContainerRef} className="w-full flex">
      <canvas
        ref={canvasRef}
        className=""
        draggable
        onClick={handleClick}
        // onTouchStart={handleClick}
        onTouchMove={handleClick}
      />
      <figcaption className="hidden">화면에 드러납니까 ?</figcaption>
    </figure>
  );
};

export default BasicLineChart;
