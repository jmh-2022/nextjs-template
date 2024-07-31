'use client';
import { useRef, useCallback, useEffect } from 'react';

/**
 * @description useDebouncedCallback 훅은 실행할 콜백과 디바운스 지연 시간을 받아들입니다.
 * @param callback
 * @param delay
 * @returns
 */
export const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  // 실행할 함수를 넣는다.
  const callbackRef = useRef(callback);
  // 타이머 ID를 저장하는 ref => 타이머를 Ref 정하는 이유는 리랜더링이 일어나면 초기화 되기 때문
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // callbackRef를 최신 상태로 유지
  callbackRef.current = callback;

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // 이전 타이머가 있다면 클리어
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // 새로운 타이머 설정
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  ); // delay가 변경되면 새로운 디바운스 함수를 생성합니다.

  return debouncedCallback;
};

export const useExternalElement = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callBack: (isOutside: boolean) => void,
) => {
  const handleClickExternalElement = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callBack(false);
      }
    },
    [ref, callBack],
  );

  useEffect(() => {
    // 외부 element 클릭 시
    window.addEventListener('mousedown', handleClickExternalElement);
    return () => {
      window.removeEventListener('mousedown', handleClickExternalElement);
    };
  }, [handleClickExternalElement]);
};
