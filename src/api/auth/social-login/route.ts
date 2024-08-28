import { NextResponse } from 'next/server';
import { TSocialProvider, socialLogin } from '../_service/accountService';

import { createJWTCookies } from '../_service/cookieHandler';
import { CommonRes } from '@/types/commonResponse';

type TParams = {
  accessToken: string;
  provider: TSocialProvider;
};

export async function POST(req: Request, context: { params: TParams }) {
  try {
    // const res = NextResponse.next();
    const res = new NextResponse();
    const request = await req.json();

    res.cookies.set('', '', { expires: 7 });

    const socialLoginResult = await socialLogin({
      accessToken: request.accessToken,
      provider: request.provider,
    });

    if (socialLoginResult.status === 'SUCCESS') {
      const { accessToken, refreshToken } = socialLoginResult.data;
      if (accessToken && refreshToken) {
        // 회원 가입 일경우 토큰 정보가 들어오지 않는다.

        createJWTCookies({ accessToken, refreshToken });
      }
    } else {
      console.error(
        '로그인 실패:',
        socialLoginResult.message || '알 수 없는 오류',
      );
      const errorBody: CommonRes<string> = {
        code: 'NEXT-ERR-001',
        data: '',
        message: socialLoginResult.message || '알 수 없는 오류',
        status: 'FAIL',
      };
      return NextResponse.json(
        errorBody,
        { status: 401 }, // Unauthorized
      );
    }

    return Response.json(socialLoginResult);
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}
