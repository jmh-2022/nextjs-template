'use client';

import { TRate } from '@/app/posts/page';
import React, { useRef, useEffect, useState } from 'react';

const XAXIS_PADDING = 10;
const YAXIS_PADDING = 25;
const Y_TICK_COUNT_MAX = 7;
const X_TICK_COUNT = 5;
const TOP_PADDING = 15;
const INITIAL_DIVIDE_VALUE = 5;
const RETRY_LIMIT = 20;

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
  sampleData: number[];
};

const drawChart = ({
  canvasHeight,
  canvasWidth,
  chartHeight,
  chartWidth,
  ctx,
  maxRatio,
  minRatio,
  sampleData,
}: TDrawChart) => {
  // 그래프의 최대 최소 값, y 기준축 개수, 나눔 값
  const { maxValue, minValue, tickCount, yScale } = adjustGraphScale(
    maxRatio,
    minRatio,
  );

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.lineWidth = 0.5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // Y축 그리기
  // ctx.moveTo(YAXIS_PADDING, )
  for (let i = 0; i <= tickCount; i++) {
    const absoluteValue = i * yScale;
    const displayValue = absoluteValue + minValue;
    const yPoint =
      TOP_PADDING +
      chartHeight -
      (absoluteValue / (maxValue - minValue)) * (chartHeight - TOP_PADDING);

    ctx.fillText(displayValue.toString(), chartWidth + 20, yPoint);
  }
  ctx.stroke();

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  const zeroValue = Math.abs(minValue);
  const zeroPoint =
    TOP_PADDING +
    chartHeight -
    (zeroValue / (maxValue - minValue)) * (chartHeight - TOP_PADDING);
  ctx.moveTo(YAXIS_PADDING, zeroPoint);
  ctx.lineTo(chartWidth, zeroPoint);
  ctx.fillText('0', chartWidth + 20, zeroPoint);
  ctx.stroke();

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();

  sampleData.forEach((point, index) => {
    const x =
      YAXIS_PADDING +
      index * ((chartWidth - YAXIS_PADDING) / (sampleData.length - 1));
    const y =
      TOP_PADDING +
      chartHeight -
      ((point - minValue) / (maxValue - minValue)) *
        (chartHeight - TOP_PADDING);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

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
    const newHeight = isLandscape
      ? screenHeight * 0.75
      : screenWidth * (9 / 16);

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

    drawPointAndLines(ctx, x, y);
  };

  const drawPointAndLines = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    const maxRatio = Math.max(...chartData.map((v) => v.rate));
    const minRatio = Math.min(...chartData.map((v) => v.rate));
    const { maxValue, minValue, shouldRetry, tickCount, yScale } =
      adjustGraphScale(maxRatio, minRatio);
    drawChart({
      ctx,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
      chartWidth: canvasSize.width - YAXIS_PADDING,
      chartHeight: canvasSize.height - XAXIS_PADDING - TOP_PADDING,
      maxRatio,
      minRatio,
      sampleData: chartData.map((v) => v.rate),
    });

    const chartWidth = canvasSize.width - YAXIS_PADDING;
    const chartHeight = canvasSize.height - XAXIS_PADDING - TOP_PADDING;
    const index = Math.round(
      (x - YAXIS_PADDING) / (chartWidth / (chartData.length - 1)),
    );
    const closestX =
      YAXIS_PADDING + index * (chartWidth / (chartData.length - 1));
    const closestY =
      TOP_PADDING +
      chartHeight -
      ((chartData[index].rate - minValue) / (maxValue - minValue)) *
        (chartHeight - TOP_PADDING);
    ctx.beginPath();
    ctx.arc(closestX, closestY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(closestX, 0);
    ctx.lineTo(closestX, canvasSize.height);
    ctx.moveTo(0, closestY);
    ctx.lineTo(canvasSize.width, closestY);
    ctx.stroke();
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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
          sampleData: chartData.map((v) => v.rate),
        });
      }
    }
  }, [canvasSize, chartData]);

  return (
    <figure ref={canvasAreaRef} className="w-full flex h-56 border">
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
// 음수일 때 반 내림 , 양수일 때 반올림
function roundToNearestMultiple(value: number, roundingBase: number): number {
  if (roundingBase === 0) return value;
  if (value > 0) {
    return Math.ceil(value / roundingBase) * roundingBase;
  } else {
    return Math.floor(value / roundingBase) * roundingBase;
  }
}

function calculateSumOfAbsolutes(
  firstValue: number,
  secondValue: number,
): number {
  return Math.abs(firstValue) + Math.abs(secondValue);
}

type TYAxisConfiguration = {
  shouldRetry: boolean;
  maxValue: number;
  minValue: number;
  tickCount: number;
  yScale: number;
};
// 그래프 Y축 범위값 조정함수
function adjustGraphScale(maxRatio: number, minRatio: number) {
  // Y축 그래프의 기준이 되는 최소 단위 5 할당
  let currentDivideValue = INITIAL_DIVIDE_VALUE;
  // 반복문 조건 변수 y축 최상단 값을 계산하기 위해 사용한다.
  let isAdjustmentComplete = false;
  // 무한루프 방지
  let retryCounter = 0;
  // 응답값 변수
  let yAxisConfiguration: TYAxisConfiguration;

  do {
    // 최대값 + (증가배수 * 나눌 값) ex] 93.7 + (0 * 5) => 93.7 + (1 * 5) 93.7 + (0 * 5) =>
    const stepwiseMaxRatio = maxRatio + retryCounter * INITIAL_DIVIDE_VALUE;
    // 최대값 배수 맞추기
    const adjustedMaxValue = roundToNearestMultiple(
      stepwiseMaxRatio,
      INITIAL_DIVIDE_VALUE,
    );
    // 최소값 배수 맞추기
    const adjustedMinValue = roundToNearestMultiple(
      minRatio,
      INITIAL_DIVIDE_VALUE,
    );

    yAxisConfiguration = calculateYAxis({
      maxValue: adjustedMaxValue,
      minValue: adjustedMinValue,
      divideValue: INITIAL_DIVIDE_VALUE,
    });

    isAdjustmentComplete = !yAxisConfiguration.shouldRetry;

    if (isAdjustmentComplete && yAxisConfiguration.tickCount < 3) {
      isAdjustmentComplete = false;
    }

    if (!isAdjustmentComplete) {
      currentDivideValue += INITIAL_DIVIDE_VALUE;
      retryCounter++;
      if (retryCounter > RETRY_LIMIT) {
        console.log('Too many adjustments in the graph scale.');
      }
    }
  } while (!isAdjustmentComplete);

  return {
    ...yAxisConfiguration,
  };
}

/**
 * maxValue와 minValue를 절대값으로 sum 하여
 * divideValue로 나눴을 때 정수이며, Y_TICK_COUNT_MAX 작은 값을 찾아 리턴한다.
 * @param maxValue, minValue, divideValue
 * @returns maxValue, minValue, shouldRetry, tickCount, yScale
 */
function calculateYAxis({
  maxValue,
  minValue,
  divideValue = INITIAL_DIVIDE_VALUE,
}: {
  maxValue: number;
  minValue: number;
  divideValue: number;
}): TYAxisConfiguration {
  let shouldRetry = true;
  let yScale = divideValue;
  let tickCount = calculateSumOfAbsolutes(maxValue, minValue) / divideValue;
  let attemptCounter = 0;

  if (tickCount < Y_TICK_COUNT_MAX + 1 && Number.isInteger(tickCount)) {
    shouldRetry = false;
  } else {
    do {
      attemptCounter++;
      if (attemptCounter > RETRY_LIMIT) {
        shouldRetry = false;
        throw Error('Too many attempts to calculate Y scale.');
      }

      const addInitDivideValue = divideValue + INITIAL_DIVIDE_VALUE;

      const {
        shouldRetry: retry,
        yScale: retryYScale,
        tickCount: retryTickCount,
      } = calculateYAxis({
        maxValue,
        minValue,
        divideValue: addInitDivideValue,
      });

      if (!retry) {
        tickCount = retryTickCount;
        yScale = retryYScale;
        shouldRetry = retry as boolean;
      }
    } while (shouldRetry);
  }

  return {
    shouldRetry,
    maxValue,
    minValue,
    tickCount,
    yScale,
  };
}

export default LineChart;
