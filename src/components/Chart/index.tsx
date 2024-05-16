'use client';

import { TRate } from '@/app/posts/page';
import React, { useRef, useEffect, useState } from 'react';
import {
  TOP_PADDING,
  XAXIS_PADDING,
  YAXIS_PADDING,
  adjustGraphScale,
} from './util';

interface CanvasSize {
  width: number;
  height: number;
}

type TDrawChart = {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  chartWidth: number;
  chartHeight: number;
  maxRatio: number;
  minRatio: number;
  chartDataList: number[];
};

function drawZeroLine({
  ctx,
  maxValue,
  minValue,
  chartHeight,
  chartWidth,
}: {
  ctx: CanvasRenderingContext2D;
  minValue: number;
  maxValue: number;
  chartHeight: number;
  chartWidth: number;
}) {
  ctx.strokeStyle = '#C7C7CC';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  const zeroValue = Math.abs(minValue);
  const zeroPoint =
    chartHeight - (zeroValue / (maxValue - minValue)) * chartHeight;
  ctx.moveTo(0, zeroPoint + TOP_PADDING);
  ctx.lineTo(chartWidth, zeroPoint + TOP_PADDING);
  ctx.stroke();
}

const drawChart = ({
  canvasHeight,
  canvasWidth,
  chartHeight,
  chartWidth,
  ctx,
  maxRatio,
  minRatio,
  chartDataList,
}: TDrawChart) => {
  // 그래프의 최대 최소 값, y 기준축 개수, 나눔 값
  const { maxValue, minValue, tickCount, yScale } = adjustGraphScale(
    maxRatio,
    minRatio,
  );

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.setLineDash([]);
  // 캔버스 border !!
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, 0);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.lineTo(0, canvasHeight);
  ctx.stroke();
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

  for (let i = 0; i <= tickCount; i++) {
    // 절대 값 Y축 기준 그리기 위해 사용
    const absoluteValue = i * yScale;
    // 화면에 보여질 값
    const displayValue = absoluteValue + minValue;
    // 제일 아래부터 그려 나간다
    const yPoint =
      chartHeight - (absoluteValue / (maxValue - minValue)) * chartHeight;

    if (displayValue === 0) {
      isZeroInclude = true;
      drawZeroLine({ ctx, chartHeight, chartWidth, maxValue, minValue });
    }
    // Y축 기준선에 글자가 딱 붙기 때문에 20정도의 여백을 준다.
    ctx.fillText(displayValue.toString(), canvasWidth, yPoint + TOP_PADDING);
  }

  if (!isZeroInclude) {
    drawZeroLine({ ctx, chartHeight, chartWidth, maxValue, minValue });
  }

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = '#15416B';
  ctx.lineWidth = 2;

  chartDataList.forEach((point, index) => {
    const x = index * (chartWidth / (chartDataList.length - 1));
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

const drawPointAndLines = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  canvasSize: CanvasSize,
  chartData: TRate[],
) => {
  const chartWidth = canvasSize.width - YAXIS_PADDING;
  const chartHeight = canvasSize.height - XAXIS_PADDING - TOP_PADDING;
  if (x < 0 || x > chartWidth) return;
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  const maxRatio = Math.max(...chartData.map((v) => v.rate));
  const minRatio = Math.min(...chartData.map((v) => v.rate));
  const { maxValue, minValue, shouldRetry, tickCount, yScale } =
    adjustGraphScale(maxRatio, minRatio);

  drawChart({
    ctx,
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    chartWidth,
    chartHeight,
    maxRatio,
    minRatio,
    chartDataList: chartData.map((v) => v.rate),
  });
  // 선택된 index 찾기 (선택 된 위치 / 차트 전체 길이 / 차트수
  const index = Math.round(x / (chartWidth / (chartData.length - 1)));
  console.log(chartData[index]);
  const closestX = index * (chartWidth / (chartData.length - 1));
  const closestY =
    chartHeight -
    ((chartData[index].rate - minValue) / (maxValue - minValue)) * chartHeight;
  ctx.beginPath();
  ctx.arc(closestX, closestY + TOP_PADDING, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#15416B';
  ctx.lineWidth = 0.5;
  ctx.fill();

  ctx.strokeStyle = 'grey';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(closestX, TOP_PADDING);
  ctx.lineTo(closestX, chartHeight + TOP_PADDING);
  // ctx.moveTo(0, closestY + TOP_PADDING);
  // ctx.lineTo(chartWidth, closestY + TOP_PADDING);
  ctx.textBaseline = 'top';
  ctx.fillText(
    chartData[index].trdDd.toString(),
    closestX,
    canvasSize.height - XAXIS_PADDING + 5,
  );

  ctx.fillText(
    chartData[index].rate.toString(),
    canvasSize.width,
    closestY + TOP_PADDING,
  );

  ctx.stroke();
};

const LineChart = ({ chartData }: { chartData: TRate[] }) => {
  const canvasAreaRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  const updateDimensions = () => {
    if (!canvasAreaRef.current) return;

    const screenWidth = canvasAreaRef.current.offsetWidth;
    const screenHeight = canvasAreaRef.current.offsetHeight;
    const isLandscape = screenWidth > screenHeight;
    const newHeight = screenWidth * (3 / 4);
    // const newHeight = isLandscape
    //   ? screenHeight * 0.75
    //   : screenWidth * (9 / 16);
    console.log(`newHeight : ${newHeight}`);
    setCanvasSize({ width: screenWidth, height: newHeight });
  };

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

    drawPointAndLines(ctx, x, y, canvasSize, chartData);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  //  캔버스의 사이즈 지정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const { width, height } = canvasSize;

        const chartWidth = width - YAXIS_PADDING;
        const chartHeight = height - XAXIS_PADDING - TOP_PADDING;

        const dpr = window.devicePixelRatio;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        let maxRatio = Math.max(...chartData.map((v) => v.rate));
        let minRatio = Math.min(...chartData.map((v) => v.rate));

        drawChart({
          ctx,
          canvasWidth: width,
          canvasHeight: height,
          chartWidth,
          chartHeight,
          maxRatio,
          minRatio,
          chartDataList: chartData.map((v) => v.rate),
        });
      }
    }
  }, [canvasSize, chartData]);

  return (
    <figure ref={canvasAreaRef} className="w-full flex">
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

export default LineChart;
