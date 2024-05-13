// import { TMemberInfo } from '@/components/common/atoms/commonAtoms';
// import { RNEventEnum, RNEventPropsType } from './bridgeType';
// import { JWTDecodeInfo } from '@/types/next-auth';
import { JWTDecodeInfo } from '@/types/commonResponse';
import { NextResponse } from 'next/server';
import React, { ReactNode, ReactElement } from 'react';

export function customLog(message?: any, ...optionalParams: any[]): void {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      console.log(`Server: ${message}`);
    } else {
      console.log(`Client: ${message}`);
    }
  }
}

export function debounce(func: Function, wait: number): Function {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function isWindowObjectAvailable() {
  // 'typeof' 연산자를 사용하여 'window' 객체의 존재 여부를 확인
  return typeof window !== 'undefined';
}

// export const reactNativeCall = (data: RNEventPropsType<RNEventEnum, any>) => {
//     //@ts-ignore
//     if (isWindowObjectAvailable() && window.ReactNativeWebView) {
//         //@ts-ignore
//         window.ReactNativeWebView.postMessage(JSON.stringify(data));
//     }
// };

// export const reactNativeLog = (message?: any, ...optionalParams: any[]) => {
//     //@ts-ignore
//     if (isWindowObjectAvailable() && window.ReactNativeWebView) {
//         //@ts-ignore
//         window.ReactNativeWebView.postMessage(
//             JSON.stringify({
//                 rnEvent: RNEventEnum.ConsoleLog,
//                 rnData: '==================================== WEB LOG ====================================',
//             } as RNEventPropsType<RNEventEnum, any>)
//         );
//         window.ReactNativeWebView.postMessage(
//             JSON.stringify({
//                 rnEvent: RNEventEnum.ConsoleLog,
//                 rnData: { message, ...optionalParams },
//             } as RNEventPropsType<RNEventEnum, any>)
//         );
//         window.ReactNativeWebView.postMessage(
//             JSON.stringify({
//                 rnEvent: RNEventEnum.ConsoleLog,
//                 rnData: '==================================== WEB LOG ====================================',
//             } as RNEventPropsType<RNEventEnum, any>)
//         );
//     }
// };

/**
 * @description 객체 내부의 값이 빈객체인지 체크
 * @param obj: {}
 * @returns boolean
 * @todo
 */

export function isEmptyObj(obj: {}) {
  if (obj instanceof Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

/**
 * @description 이미지 url을 파일 형태로 변환 함.
 * @param url: string
 * @returns Blob
 * @todo
 */

export const convertURLtoBlob = async (url: string) => {
  const response = await fetch(url);

  const data = await response.blob();

  return data;
};

/**
 * @description 전달받은 숫자 값에 세번째 자리마다 콤마
 * @param x: string | number
 * @returns T[]
 * @todo
 */

export const numberWithCommas = (x: string | number): string => {
  // 숫자를 문자열로 변환
  const numberString: string = x.toString();

  // 소수점을 기준으로 정수부와 소수부를 나눕니다.
  const parts: string[] = numberString.split('.');

  // 정수부에 콤마를 추가합니다.
  const integerPartWithCommas: string = parts[0].replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  // 소수부가 있는 경우 다시 합치고 반환합니다.
  if (parts.length === 2) {
    return integerPartWithCommas + '.' + parts[1];
  } else {
    return integerPartWithCommas;
  }
};

/**
 * @description 배열의 원하는 위치에 데이터를 삽입하는 기능
 * @param arr: T[], index: number,  replacement: T
 * @returns T[]
 * @todo
 */

export function replaceElementAtIndex<T>(
  arr: T[],
  index: number,
  replacement: T,
): T[] {
  return [...arr.slice(0, index), replacement, ...arr.slice(index + 1)];
}

/**
 * @description contentEditable을 사용하는 div태그의 커서 오류해결
 * contentEditable 사용 시 커서가 맨 앞으로 가 있는게 default 값이라 커서의 위치를 변경해주는 로직 필요
 * @param HTMLDivElement
 * @returns void
 * @todo
 */

export const setCaretPosition = (element: HTMLDivElement) => {
  const range = document.createRange();
  const sel = window.getSelection();

  if (element.textContent) {
    range.setStart(element.childNodes[0], element.textContent.length);
  }

  range.collapse(true);

  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  element.focus();
};

// Base64 문자열을 Blob 객체로 변환하는 함수
const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

/**
 * 이미지를 blob 타입으로 변환
 * @date 6/7/2023 - 5:04:52 PM
 *
 * @async
 * @param {string} imageUrl
 * @param {string} fileName
 * @returns {unknown}
 */
export const convertToBlob = async (imageUrl: string, fileName: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName, {
    type: `image/${fileName.split('.')[1]}`,
  });
  return file;
};

/**
 * URI 경로를 '/'로 구분하여 배열로 변환 후 지정된 배열 인덱스의 값을 반환
 * @date 3/7/2023 - 5:00:00 PM
 *
 * @param {string} uriPath
 * @param {number} arrayIndex
 */
export const getValueFromURIPath = (uriPath: string, arrayIndex: number) => {
  const pathArray = uriPath.split('/').filter(Boolean); // URI 경로를 '/'로 구분하여 배열로 변환

  if (arrayIndex >= 0 && arrayIndex < pathArray.length) {
    return pathArray[arrayIndex]; // 지정된 배열 인덱스의 값을 반환
  } else {
    return null; // 유효한 배열 인덱스가 아닐 경우 null 반환
  }
};

/**
 * url 파라미터 읽는 공통 함수
 * @date 2023. 7. 12. - 오전 10:05:12
 *
 * @param {string} name
 * @param {?string} [url]
 * @returns {*}
 */
export const getParameterByName = (name: string, url?: string) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const cutDecimal = (
  number: number | string,
  decimalPlaces: number = 1,
) => {
  return Math.abs(Number(Number(number).toFixed(decimalPlaces)));
};

/**
 * object[] 파라미터로 전달받은 키의 데이터가 중복인 키값을 제거한다. 배열 순서상 마지막에 있는 데이터를 남긴다.
 * @date 2023. 7. 12. - 오전 10:05:12
 *
 * @param {string} name
 * @param {?string} [url]
 * @returns {*}
 */
export function removeDuplicates<T extends Record<K, any>, K extends keyof T>(
  array: T[],
  key: K,
): T[] {
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}

/**
 * jwt 토큰을 받아 json object 로 리턴한다.
 * @param token
 * @returns
 */
export function parseJwt(token?: string): JWTDecodeInfo | null {
  if (!token) return null;
  try {
    // 토큰을 '.' 기준으로 분리하여 페이로드 부분만 추출합니다.
    const base64Url = token.split('.')[1];
    // Base64 URL 인코딩을 Base64 인코딩으로 변환합니다.
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Base64 인코딩된 문자열을 디코딩합니다.
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    // JSON으로 파싱합니다.
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT', e);
    return null;
  }
}

export function isTimestampExpired(expTimestamp: number | undefined) {
  if (!expTimestamp) return true;

  // 현재 시간을 유닉스 타임스탬프로 변환
  // 서버에서 주는 시간이 1000 을 나눈 값을 주기 때문에 아래와같이 1000을 나눈다
  const currentTime = Math.floor(Date.now() / 1000);

  // 만료 시간과 현재 시간 비교
  return expTimestamp < currentTime;
}

export function createUrlWithPath(
  baseUrl: string,
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + baseUrl);

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.pathname + url.search;
}

export function isSafariBrowser() {
  if (isWindowObjectAvailable()) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
}

export const handleAppLaunch = () => {
  // 앱 실행에 실패한 경우의 로직을 여기에 추가하세요
  if (/android/i.test(navigator.userAgent)) {
    // Android 기기에서 앱이 없는 경우
    // window.location.href =
    //   'https://play.google.com/store/apps/details?id=kr.co.kildare.hakyeon';
    window.open(
      'https://play.google.com/store/apps/details?id=kr.co.kildare.routineon',
      '_blank',
    );
  } else if (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    // iOS 기기에서 앱이 없는 경우
    // window.location.href = 'https://apps.apple.com/kr/app/id362057947';
    window.open('https://apps.apple.com/kr/app/id6479598118', '_blank');
  } else {
    // 기타 플랫폼 또는 실패한 경우
    // 여기에 다른 행동을 추가할 수 있습니다.
  }
};

// helper to get user from localstorage
// const USER_LOCALSTORAGE_KEY = 'memberInfo';
// export function getStoredUser() {
//     const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
//     return storedUser ? (JSON.parse(storedUser) as TMemberInfo) : null;
// }
// export function setStoredUser(member: TMemberInfo) {
//     localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(member));
// }

// 환경 변수 최적화
const isProduction = process.env.NODE_ENV === 'production';

// 쿠키 설정 함수
export function setCookie(
  res: NextResponse,
  name: string,
  value: string,
  expires: number,
) {
  res.cookies.set(name, value, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    expires: new Date(expires),
  });
}

export function shallowCompareNodes(
  node1: ReactNode,
  node2: ReactNode,
): boolean {
  // 둘 다 React 요소인 경우
  if (React.isValidElement(node1) && React.isValidElement(node2)) {
    if (node1.type !== node2.type) {
      return false;
    }
    const props1 = (node1 as ReactElement).props;
    const props2 = (node2 as ReactElement).props;
    const keys1 = Object.keys(props1);
    const keys2 = Object.keys(props2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (props1[key] !== props2[key]) {
        return false;
      }
    }

    return true;
  }

  // 둘 다 배열인 경우
  if (Array.isArray(node1) && Array.isArray(node2)) {
    if (node1.length !== node2.length) {
      return false;
    }
    for (let i = 0; i < node1.length; i++) {
      if (!shallowCompareNodes(node1[i], node2[i])) {
        return false;
      }
    }
    return true;
  }

  // 기본 타입 비교 (문자열, 숫자 등)
  return node1 === node2;
}

export default shallowCompareNodes;
