'use server';

import { CookieKeys } from '@/constants/cookieKey';
import { parseJwt } from '@/utils/util';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const env = process.env.NEXT_PUBLIC_ENV_TYPE;

export async function createJWTCookies({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const refreshTokenJwt = parseJwt(refreshToken);
  const accessTokenJwt = parseJwt(accessToken);

  if (refreshTokenJwt && accessTokenJwt) {
    const secure = env !== 'LOCAL';
    const sameSite = 'lax';
    const path = '/';

    // 서버에서 사용할 refresh token
    cookies().set(CookieKeys.refreshToken, refreshToken, {
      httpOnly: true,
      secure,
      sameSite,
      path,
      expires: new Date(refreshTokenJwt.exp * 1000),
    });
    // 서버에서 사용할 access token
    cookies().set(CookieKeys.accessToken, accessToken, {
      httpOnly: true,
      secure,
      sameSite,
      path,
      expires: new Date(refreshTokenJwt.exp * 1000),
    });
    // client 단에서 사용할 access token
    cookies().set(CookieKeys.clientAccessToken, accessToken, {
      httpOnly: false, // JavaScript를 통한 접근을 차단 (XSS 공격 방지)
      secure, // 프로덕션 환경에서만 HTTPS를 통해 쿠키 전송 (보안 강화)
      sameSite, // 크로스 사이트 요청 시 제한적인 쿠키 전송 (CSRF 공격 방지)
      path, // 쿠키가 사이트의 모든 경로에서 사용됨
      expires: new Date(accessTokenJwt.exp * 1000), // 쿠키의 만료 시간 설정
    });
  } else {
    console.error('refresh token 정보가 없습니다.');
    throw new Error('refresh token 정보가 없습니다.');
  }
}

export async function createJWTCookiesInMiddlware({
  accessToken,
  refreshToken,
  res,
}: {
  accessToken: string;
  refreshToken: string;
  res: NextResponse<unknown>;
}) {
  const refreshTokenJwt = parseJwt(refreshToken);
  const accessTokenJwt = parseJwt(accessToken);

  if (refreshTokenJwt && accessTokenJwt) {
    const secure = env !== 'LOCAL';
    const sameSite = 'lax';
    const path = '/';

    res.cookies.set(CookieKeys.refreshToken, refreshToken, {
      httpOnly: true,
      secure,
      sameSite,
      path,

      expires: new Date(refreshTokenJwt.exp * 1000),
    });
    res.cookies.set(CookieKeys.accessToken, accessToken, {
      httpOnly: true, // JavaScript를 통한 접근을 차단 (XSS 공격 방지)
      secure, // 프로덕션 환경에서만 HTTPS를 통해 쿠키 전송 (보안 강화)
      sameSite, // 크로스 사이트 요청 시 제한적인 쿠키 전송 (CSRF 공격 방지)
      path, // 쿠키가 사이트의 모든 경로에서 사용됨

      expires: new Date(refreshTokenJwt.exp * 1000), // 쿠키의 만료 시간 설정
    });

    res.cookies.set(CookieKeys.clientAccessToken, accessToken, {
      httpOnly: false, // JavaScript를 통한 접근을 차단 (XSS 공격 방지)
      secure, // 프로덕션 환경에서만 HTTPS를 통해 쿠키 전송 (보안 강화)
      sameSite, // 크로스 사이트 요청 시 제한적인 쿠키 전송 (CSRF 공격 방지)
      path, // 쿠키가 사이트의 모든 경로에서 사용됨

      expires: new Date(accessTokenJwt.exp * 1000), // 쿠키의 만료 시간 설정
    });
  } else {
    console.error('refresh token 정보가 없습니다.');
    throw new Error('refresh token 정보가 없습니다.');
  }
}

export async function deleteJWTCookiesInMiddleware(res: NextResponse<unknown>) {
  const secure = env !== 'LOCAL';
  const sameSite = 'lax';
  const path = '/';
  const expires = new Date(0); // 과거 날짜 설정 (쿠키 삭제)

  res.cookies.set(CookieKeys.refreshToken, '', {
    httpOnly: true,
    secure,
    sameSite,
    path,
    expires,
  });
  res.cookies.set(CookieKeys.accessToken, '', {
    httpOnly: true,
    secure,
    sameSite,
    path,
    expires,
  });
  res.cookies.set(CookieKeys.clientAccessToken, '', {
    httpOnly: false,
    secure,
    sameSite,
    path,
    expires,
  });
}

export async function deleteJWTCookies() {
  cookies().delete(CookieKeys.clientAccessToken);
  cookies().delete(CookieKeys.accessToken);
  cookies().delete(CookieKeys.refreshToken);
}
