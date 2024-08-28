import { getClientReissueToken } from '@/api/auth/_service/accountService';
import { CookieKeys } from '@/constants/cookieKey';

import { NetworkError } from '@/errors/CustomError';
import { CommonRes } from '@/types/commonResponse';
import {
  getCookie,
  isTimestampExpired,
  isWindowObjectAvailable,
  parseJwt,
} from '@/utils/util';

type Props<T = any> = T;

const ContentType = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '';
export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const nextApiBaseUrl = process.env.NEXT_PUBLIC_WEB_URL;

export async function callFetch<T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  props?: Props,
  header?: HeadersInit,
  contentType = 'application/json',
): Promise<T> {
  try {
    const accessToken = await tokenProvider();
    // const headers: HeadersInit = {
    //   'Content-Type': contentType,
    //   ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    //   ...header,
    // };

    const body =
      contentType === ContentType.applicationJson
        ? JSON.stringify(props)
        : (props as FormData);

    const endPoint = baseUrl + url;

    const response = await fetch(endPoint, {
      method,
      // headers,
      body,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`,
      );

      throw new NetworkError(
        `Network response was not ok for ${method} request to ${url}`,
        response.status,
        response.statusText,
        errorBody,
      );
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof NetworkError) {
      throw error;
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

export async function tokenProvider(): Promise<string | undefined> {
  if (isWindowObjectAvailable()) {
    // console.log(':: 클라이언트 환경 ::');

    let accessToken = getCookie(CookieKeys.clientAccessToken);
    // 🙏 토큰 재발행 로직 공간 🙏
    // if (accessToken) {
    //   const accessTokenJwt = parseJwt(accessToken);
    //   const isExpired = isTimestampExpired(accessTokenJwt?.exp);

    //   if (isExpired) {
    //     const { data, status } = await getClientReissueToken();

    //     if (status === 'SUCCESS') {
    //       accessToken = data.accessToken;
    //     } else {
    //       // debugger;
    //     }
    //   }
    // } else {
    //   const { data, status } = await getClientReissueToken();
    //   if (status === 'SUCCESS') {
    //     accessToken = data.accessToken;
    //   }
    // }
    // 🙏 토큰 재발행 로직 공간 🙏

    return accessToken ?? undefined;
  } else {
    // console.log(':: 서버사이드 환경 ::');
    // 빌드시 정적 페이지에서 쿠키를 사용할 경우 빌드 에러가 발생한다.
    // 쿠키는 동적상태(값이 가변적임)를 갖기 때문에 정적 페이지 빌드에 사용될 수 없음.
    // 정적 페이지로 빌드가 되는 곳에 🔥 export const dynamic = 'force-dynamic'; 키워드를 넣어주면 된다.
    const { cookies } = await import('next/headers');

    let clientAccessToken = cookies().get(CookieKeys.clientAccessToken)?.value;
    // 🙏 토큰 재발행 로직 공간 🙏
    // let accessToken = cookies().get(CookieKeys.accessToken)?.value;
    // const refreshToken = cookies().get(CookieKeys.refreshToken)?.value;
    // // 여기서 리이슈 토큰을 호출 할때
    // if (!clientAccessToken && accessToken && refreshToken) {
    //   const { status, data, message } = await getClientReissueToken();
    //   if (status === 'SUCCESS') {
    //     clientAccessToken = data.accessToken;
    //   }
    // }
    // 🙏 토큰 재발행 로직 공간 🙏
    return clientAccessToken;
  }
}

export async function callFetchGet<T, P = any>(
  url: string,
  props?: P,
): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>>(url, 'GET', props);
}

export async function callFetchPost<T, P = any>(
  url: string,
  props?: P,
): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>>(url, 'POST', props);
}

export async function callFetchDelete<T, P = any>(
  url: string,
  props?: P,
): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>>(url, 'DELETE', props);
}
export async function callFetchPatch<T, P = any>(
  url: string,
  props?: P,
): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>>(url, 'PATCH', props);
}

export async function callFetchPut<T, P = any>(
  url: string,
  props?: P,
): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>>(url, 'PUT', props);
}
