import { RefObject } from 'react';

export type IRateReturnHistory = {
  totalRate: number;
  rate: number;
  trdDd: string;
  clsPrc: number;
  estmStdprc: number;
  totalPrc: number;
};

export type TLineChartData = {
  label: string;
  value: number;
};

export type TCanvasAreaWH = {
  screenWidth: number;
  calculatedHeight: number;
};

export type TUseCanvasSize = {
  canvasSize: TCanvasSize;
  updateCanvasSize: (req: TCanvasAreaWH) => void;
  canvasContainerRef: RefObject<HTMLElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | undefined;
};

export type TDrawChart = TCanvasSize & {
  ctx: CanvasRenderingContext2D;
  yAxisValueList: number[];
  yConfig: TYAxisConfiguration;
};

export type TDrawChartEvent = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  canvasSize: TCanvasSize;
  yConfig: TYAxisConfiguration;
  dataList: TLineChartData[];
};

export type TYAxisConfiguration = {
  shouldRetry?: boolean;
  maxValue: number;
  minValue: number;
  tickCount: number;
  yScale: number;
};

export const XAXIS_PADDING = 30;
export const YAXIS_PADDING = 40;
export const Y_TICK_COUNT_MAX = 7;
export const X_TICK_COUNT = 5;
export const TOP_PADDING = 15;
export const INITIAL_DIVIDE_VALUE = 5;
export const RETRY_LIMIT = 20;

// 음수일 때 반 내림 , 양수일 때 반올림
export function roundToNearestMultiple(
  value: number,
  roundingBase: number,
): number {
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

// 그래프 Y축 범위값 조정함수

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

export function adjustGraphScale(maxRatio: number, minRatio: number) {
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
    maxValue: yAxisConfiguration.maxValue,
    minValue: yAxisConfiguration.minValue,
    tickCount: yAxisConfiguration.tickCount,
    yScale: yAxisConfiguration.yScale,
  };
}
export function adjustPriceGraphScale(maxPrice: number, minPrice: number) {
  const maxMinusMin = maxPrice - minPrice;
  const yScale = Math.floor(maxMinusMin / 4 / 10) * 10;
  const minValue = minPrice - yScale;
  const maxValue = minValue + yScale * 6;

  return {
    maxValue,
    minValue,
    yScale,
    tickCount: 6,
  };
}

export type TCanvasSize = {
  canvasWidth: number;
  canvasHeight: number;
  chartWidth: number;
  chartHeight: number;
};

export function getYAxisConfig(
  chartData: TLineChartData[],
  type: 'price' | 'rate',
) {
  const maxValue = Math.max(...chartData.map((v) => v.value));
  const minValue = Math.min(...chartData.map((v) => v.value));

  return type === 'rate'
    ? adjustGraphScale(maxValue, minValue)
    : adjustPriceGraphScale(maxValue, minValue);
}

export * from './BasicLineChart';
export * from './DividendLineChart';
