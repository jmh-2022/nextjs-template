import { CommonRes } from '@/types/commonResponse';
import {
  isTimestampExpired,
  isWindowObjectAvailable,
  parseJwt,
} from '@/utils/util';

type Props<T = unknown> = T;

const ContetType = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

export const API_BASE_URL = '/routine-on/api/v1';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function callFetch<T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  props?: Props,
  header?: HeadersInit,
  contentType = 'application/json',
): Promise<T> {
  try {
    const headers: HeadersInit = {
      'Content-Type': contentType,
      ...header,
    };

    const body =
      contentType === ContetType.applicationJson
        ? JSON.stringify(props)
        : (props as FormData);

    const endPoint = baseUrl + url;

    const response = await fetch(endPoint, {
      method: method,
      headers,
      body,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`,
      );

      throw new Error(
        `Network response was not ok for ${method} request to ${url}`,
      );
    }
    // console.log(await response.json());
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`1: Failed to fetch data: ${error}`);

      throw new Error(`Failed to fetch data: ${error}`);
    } else {
      console.log(`An unknown error occurred: ${error}`);
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

async function tokenProvider() {
  // const { cookies: abc } = await import('next/headers');
  // console.log(abc().get('accessToken')?.value);
  if (isWindowObjectAvailable()) {
    console.log(':: 클라이언트 환경 ::');
  } else {
    console.log(':: 서버사이드 환경 ::');
    const { cookies } = await import('next/headers');

    let accessToken = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value;

    if (accessToken && refreshToken) {
      const memberInfo = parseJwt(accessToken);
      const isExpired = isTimestampExpired(1);

      // 만료 체크
      if (isExpired) {
        // const { status, data, message } = await getReissueToken({
        //   accessToken,
        //   refreshToken,
        // });
        // if (status === 'SUCCESS') {
        //   accessToken = data.accessToken;
        // }
      }

      // headers['Authorization'] = `Bearer ${accessToken}`;

      return accessToken;
    }
  }
}

export async function callFetchGet<T, P = any>(
  url: string,
  props?: P,
): Promise<T> {
  const accessToken = await tokenProvider();
  console.log('accessToken ::', accessToken);
  return callFetch<T>(url, 'GET', props);
}

export async function callFetchPost<T, P = any>(
  url: string,
  props?: P,
): Promise<T> {
  return callFetch<T>(url, 'POST', props);
}

export async function callFetchDelete<T, P = any>(
  url: string,
  props?: P,
): Promise<T> {
  return callFetch<T>(url, 'DELETE', props);
}

export async function callFetchPut<T, P = any>(
  url: string,
  props?: P,
): Promise<T> {
  return callFetch<T>(url, 'PUT', props);
}

// export async function callFetchMultipartFormData<T>(
//   url: string,
//   data: Record<string, Blob | string>,
// ): Promise<CommonRes<T>> {
//   const formData = new FormData();

//   // ** 아래는 나중에 수정 필요 ** //
//   //   for (const key in data) {
//   //     if (data.hasOwnProperty(key)) {
//   //       formData.append(key, data[key]);
//   //     }
//   //   }

//   return callFetch<T>(
//     url,
//     'POST',
//     formData,
//     false,
//     ContetType.multipartFormData,
//   );
// }
