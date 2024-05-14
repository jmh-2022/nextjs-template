'use client';

import React, { useRef, useEffect, useState } from 'react';

const XAXIS_PADDING = 10;
const YAXIS_PADDING = 25;
const MAX_VALUE = 100;
const Y_TICK_COUNT = 5;
const Y_TICK_COUNT_MAX = 7;
const X_TICK_COUNT = 5;
const TOP_PADDING = 15;
const INITIAL_DIVIDE_VALUE = 5;
const RETRY_LIMIT = 20;

interface CanvasSize {
  width: number;
  height: number;
}

const drawChart = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  chartWidth: number,
  chartHeight: number,
) => {
  const maxRatio: number = 105;
  const minRatio: number = -15;
  const { maxValue, minValue, shouldRetry, tickCount, yScale } =
    adjustGraphScale(maxRatio, minRatio);

  // 차트 초기화
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // 그리기 시작
  ctx.beginPath();

  // 선 스타일 조정
  ctx.lineWidth = 0.5; // 선의 두께
  ctx.lineCap = 'round'; // 선의 끝 모양을 둥글게
  ctx.strokeStyle = '#000'; // 선의 색상
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  // 아래에서 위로 그려올라간다.
  for (let i = 0; i <= tickCount; i++) {
    const absoluteValue = i * yScale;
    const displayValue = absoluteValue + minValue;

    const yPoint =
      TOP_PADDING +
      chartHeight -
      ((absoluteValue - minValue) / (maxValue - minValue)) * chartHeight;

    // X축 가로선
    ctx.moveTo(YAXIS_PADDING, yPoint);
    ctx.lineTo(chartWidth, yPoint);
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
    (zeroValue / (maxValue - minValue)) * chartHeight;
  ctx.moveTo(YAXIS_PADDING, zeroPoint);
  ctx.lineTo(chartWidth, zeroPoint);
  ctx.fillText('0', chartWidth + 20, zeroPoint);
  ctx.stroke();

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();

  const sampleData = [0, -15, 0, 40, 0, 60, 0, 80, 0, 105, 0]; // 샘플 데이터 포인트

  sampleData.forEach((point, index) => {
    const x =
      YAXIS_PADDING +
      index * ((chartWidth - YAXIS_PADDING) / (sampleData.length - 1));

    const y =
      TOP_PADDING +
      chartHeight -
      ((point - minValue) / (maxValue - minValue)) * chartHeight;

    // 시작 점만 0으로 이동한다.
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
};

const LineChart2: React.FC = () => {
  const canvasAreaRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  const updateDimensions = () => {
    if (!canvasAreaRef.current) return;

    // 캔버스를 감싸는 영역 너비 값을 가져온다.
    const screenWidth = canvasAreaRef.current.offsetWidth;
    // 캔버스를 감싸는 영역 높이 값을 가져온다
    const screenHeight = canvasAreaRef.current.offsetHeight;

    console.log(`너비 : ${screenWidth} | 높이 :  ${screenHeight}`);

    // 스크린의 가로 세로 비율을 계산합니다.
    const isLandscape = screenWidth > screenHeight;

    // 가로모드인 경우 높이를 75%로 설정합니다.
    const newHeight = isLandscape
      ? screenHeight * 0.75
      : screenWidth * (9 / 16);

    console.log(`가로 너비(${screenWidth}) 기준 차트영역 높이: ${newHeight}`);

    setCanvasSize({ width: screenWidth, height: newHeight });
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
        // y축 패딩 - 캔버스 사이즈
        const chartWidth = width - YAXIS_PADDING;
        // 캔버스 높이 - x축 패딩 - top 패딩
        const chartHeight = height - XAXIS_PADDING - TOP_PADDING;
        // 픽셀 배율 값
        const dpr = window.devicePixelRatio;

        // 캔버스 상의 그려질 필셀 수를 정의한다 정의 하지 않을 경우 선이 옅게 보이는 이슈가 발생한다.
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // 화면 상의 실제로 그려질 캔버스의 크기를 정한다.
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height, chartWidth, chartHeight);
      }
    }
  }, [canvasSize]);

  return (
    <figure ref={canvasAreaRef} className="w-full flex h-56">
      <canvas ref={canvasRef} className="" />
      <figcaption className="hidden">화면에 드러납니까 ?</figcaption>
    </figure>
  );
};

function roundToNearestMultiple(value: number, roundingBase: number): number {
  if (roundingBase === 0) return value; // 0으로 나누기 방지
  if (value > 0) {
    // 양수인 경우, 가장 가까운 roundingBase의 배수로 올림
    return Math.ceil(value / roundingBase) * roundingBase;
  } else {
    // 음수인 경우, 가장 가까운 roundingBase의 배수로 내림
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

function adjustGraphScale(maxRatio: number, minRatio: number) {
  console.log('=================== 스케일 구하기 시작 ===================');
  console.log(`maxRatio: ${maxRatio} // minRatio: ${minRatio}`);
  console.log('=================== 스케일 구하기 시작 ===================');

  let currentDivideValue = INITIAL_DIVIDE_VALUE;
  let isAdjustmentComplete: boolean = false;
  let retryCounter: number = 0; // 오류 상황 반복 횟수 제한
  let yAxisConfiguration: TYAxisConfiguration;

  // Max value를 조정하는 반복문
  do {
    // scale을 구하기 위한 Max max value (수익률 최대 값 + (반복횟수 * 증감 배율))
    const stepwiseMaxRatio = maxRatio + retryCounter * INITIAL_DIVIDE_VALUE;
    // 0, 5, 10, 15 순으로 증가
    const adjustedMaxValue = roundToNearestMultiple(
      stepwiseMaxRatio,
      INITIAL_DIVIDE_VALUE,
    );
    // 최소 값은 변하지 않는다.
    const adjustedMinValue = roundToNearestMultiple(
      minRatio,
      INITIAL_DIVIDE_VALUE,
    );

    // 나눌 값을 구한다.
    yAxisConfiguration = calculateYAxis({
      maxValue: adjustedMaxValue,
      minValue: adjustedMinValue,
      divideValue: INITIAL_DIVIDE_VALUE,
    });
    console.log(yAxisConfiguration);
    // console.log(`Current Division Value: ${retryCounter * INITIAL_DIVIDE_VALUE}`, yAxisConfiguration);
    isAdjustmentComplete = !yAxisConfiguration.shouldRetry; // 재시도 필요 여부 확인

    if (isAdjustmentComplete && yAxisConfiguration.tickCount < 3) {
      // tick count 올바르지 않아 최대 값을 증가 시켜 함수 재 실행
      isAdjustmentComplete = false;
    }

    if (!isAdjustmentComplete) {
      currentDivideValue += INITIAL_DIVIDE_VALUE; // currentDivideValue 조정

      retryCounter++; // 재시도 횟수 증가
      if (retryCounter > RETRY_LIMIT) {
        // 재시도 횟수가 일정 수준을 넘으면
        console.log('Too many adjustments in the graph scale.');
      }
    }
  } while (!isAdjustmentComplete);

  return {
    ...yAxisConfiguration,
  };
}

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
  let attemptCounter: number = 0; // 오류 상황 반복 횟수 제한
  // MAX_TICK_COUNT 보다 클 때사용할 값

  // 소수점을 포함해야 하기 때문에 예를 들어 (Y_TICK_COUNT_MAX =7) 7.3 하위로 들어오면 포함이라 본다.
  // tickCount가 Y_TICK_COUNT_MAX 보다 이하인 정수 값을 찾는다.
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

      // 재귀적 호출
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

export default LineChart2;