import { NetworkError } from '@/errors/CustomError';
import { baseUrl, callFetchGet, callFetchPost } from '@/service/apiClient';
import { CommonRes } from '@/types/commonResponse';

import { createUrlWithPath } from '@/utils/util';

export type TAuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type SocialLoginInfo = TAuthToken & {
  socialId: string;
  email: string;
  accountType: string;
  profileImageUri: string;
};

export type AccessTokenInfo = {
  memberNo: number;
  nickName: string;
  roles: 'ROLE_USER';
  iat: number;
  exp: number;
  profileImageUri: string;
};

export type TReqSocialSignUp = {
  socialId: string;
  accountType: string;
  policyAgree: string;
  gender: string;
};
export type TSocialProvider = 'apple' | 'kakao' | 'naver' | 'google';

// API 엔드포인트를 상수로 관리

const TOKEN_REISSUE_URL = `/member/reissue/token`;
const CHECK_WITHDRAWAL_URL = `/member/check/withdrawal`;

type TReqSocialLogin = {
  provider: TSocialProvider;
  accessToken: string;
};
export type TReqSocialLogout = {
  fcmToken: string;
  refreshToken: string;
};
export async function socialLogin({
  accessToken,
  provider,
}: TReqSocialLogin): Promise<CommonRes<SocialLoginInfo>> {
  return await callFetchPost(`/oauth2/${provider}/login`, {
    accessToken,
  });
}

export async function nexstApiSocialLogin({
  accessToken,
  provider,
}: TReqSocialLogin): Promise<CommonRes> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  headers['Authorization'] = `Bearer ${accessToken}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/social-login`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ accessToken, provider }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`,
    );

    throw new Error(`Network response was not ok for `);
  }
  return await response.json();
}
export async function nexstApiSocialLogout({
  fcmToken,
  refreshToken,
}: TReqSocialLogout) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/logout`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ fcmToken, refreshToken }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`,
    );

    throw new Error(`Network response was not ok for `);
  }
  return await response.json();
}

export async function logout({
  fcmToken,
  refreshToken,
}: {
  fcmToken: string;
  refreshToken: string;
}): Promise<CommonRes<SocialLoginInfo>> {
  return await callFetchPost(`/member/logout`, {
    fcmToken,
    refreshToken,
  });
}
export async function nextApiLogout({
  fcmToken,
  refreshToken,
}: {
  fcmToken: string;
  refreshToken: string;
}): Promise<CommonRes<SocialLoginInfo>> {
  return await callFetchPost(`/member/logout`, {
    fcmToken,
    refreshToken,
  });
}

// export async function getReissueToken(
//   req: TAuthToken,
// ): Promise<CommonRes<TAuthToken>> {
//   return await callFetchPost(TOKEN_REISSUE_URL, req);
// }

export async function getReissueToken(
  req: TAuthToken,
): Promise<CommonRes<TAuthToken>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  headers['Authorization'] = `Bearer ${req.accessToken}`;

  const response = await fetch(baseUrl + TOKEN_REISSUE_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(req),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`,
    );

    throw new Error(`Network response was not ok for `);
  }
  return await response.json();
}

export async function getClientReissueToken() {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/reissue`;
  const method = 'POST';
  const response = await fetch(url, {
    method,
    headers: headers,

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
  // return callFetch<TAuthToken>(`${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/reissue`, 'POST', { accessToken }, true);
}

export async function isWithdrawal(req: {
  provider: string;
  accessToken: string;
}): Promise<CommonRes<boolean>> {
  return await callFetchGet(
    createUrlWithPath(CHECK_WITHDRAWAL_URL, { ...req }),
  );
}
