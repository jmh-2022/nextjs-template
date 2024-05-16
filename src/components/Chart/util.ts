export type TYAxisConfiguration = {
  shouldRetry: boolean;
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

export // 음수일 때 반 내림 , 양수일 때 반올림
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
    ...yAxisConfiguration,
  };
}
