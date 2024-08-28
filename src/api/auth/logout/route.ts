import { cookies } from 'next/headers';
import { logout } from '../_service/accountService';
import { NextResponse } from 'next/server';
import {
  deleteJWTCookies,
  deleteJWTCookiesInMiddleware,
} from '../_service/cookieHandler';
import { CookieKeys } from '@/constants/cookieKey';
import { CommonRes } from '@/types/commonResponse';

export async function POST(request: Request) {
  // const requestMethod = request.method;
  try {
    const req = await request.json();

    const refreshToken = cookies().get(CookieKeys.refreshToken);

    if (refreshToken?.value) {
      const getReissueTokenResult = await logout({
        fcmToken: req.fcmToken || 'meaningless value', // 빈 값이 들어가지 않도록 임시로 값 넣음
        refreshToken: refreshToken.value,
      });
      deleteJWTCookies();
      const response = NextResponse.json({
        status: 'SUCCESS',
        code: '',
        data: '',
        message: '',
      } as CommonRes);

      deleteJWTCookiesInMiddleware(response);
      return response;
    } else {
      deleteJWTCookies();
      return Response.json(
        { message: '쿠키에 저장된 리프레시 토큰이 없습니다. ' },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
  }
}
