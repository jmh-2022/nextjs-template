// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { CookieKeys } from './constants/cookieKey';
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { getReissueToken } from './api/auth/_service/accountService';
import {
  createJWTCookiesInMiddlware,
  deleteJWTCookiesInMiddleware,
} from './api/auth/_service/cookieHandler';

function isProtectedPath(pathname: string) {
  const protectedPaths = ['/favorites', '/menu/mypage', '/menu/inquiry'];
  return protectedPaths.some((path) => pathname.startsWith(path));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  // 토큰을 쿠키에서 가져오기

  let accessToken = cookies().get(CookieKeys.accessToken)?.value;
  let refreshToken = cookies().get(CookieKeys.refreshToken)?.value;
  let clientAccessToken = cookies().get(CookieKeys.clientAccessToken)?.value;

  // 🔥🔥🔥 미들웨어 토큰 재발행 로직
  // if (accessToken && refreshToken && isProtectedPath(pathname)) {
  //   // 쿠키로 토큰을 보관하기 때문에 만료될경우 자동으로 사라진다.
  //   if (!clientAccessToken) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = '/login';
  //     try {
  //       const { status, data, message } = await getReissueToken({
  //         accessToken,
  //         refreshToken,
  //       });

  //       if (status === 'SUCCESS') {
  //         accessToken = data.accessToken;
  //         refreshToken = data.refreshToken;
  //         // 새로고침 시 미들웨어에서 저장한 쿠키가 사라지는 이슈가 있었다 아래 방식으로 해결
  //         // 14.3 버전 이후 부터는 set만 해도 잘 된다고 한다.
  //         // https://medium.com/@devparkoon/next-js-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EC%97%90%EC%84%9C-%EC%84%B8%ED%8C%85%ED%95%9C-%EC%BF%A0%ED%82%A4%EA%B0%80-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90-%EB%B0%94%EB%A1%9C-%EC%A0%81%EC%9A%A9%EC%9D%B4-%EC%95%88%EB%90%A0-%EB%95%8C-85e6083eb53f
  //         const res = NextResponse.redirect(req.url);
  //         createJWTCookiesInMiddlware({ accessToken, refreshToken, res });
  //         applySetCookie(req, res);
  //         return res;
  //       } else {
  //         console.error(message);
  //         // return 으로 작업을 종료 하여 cookie를 채워 넣지 않는다.
  //         const response = NextResponse.redirect(url);
  //         deleteJWTCookiesInMiddleware(response);
  //         return response;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       const response = NextResponse.redirect(url);

  //       deleteJWTCookiesInMiddleware(response);

  //       return response;
  //     }
  //   }
  //   //공식 문서 기준 middleware 에서는 cookie를 셋 할때 req,res를 사용해야한다고 함
  //   createJWTCookiesInMiddlware({ accessToken, refreshToken, res });
  // }

  if (!accessToken && isProtectedPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return res;
}

// 미들웨어 설정
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$).*)',
  ],
};

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const resCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  resCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}
