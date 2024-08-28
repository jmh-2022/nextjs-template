import { TAuthToken, getReissueToken } from '../_service/accountService';
import { CommonRes } from '@/types/commonResponse';

import { cookies } from 'next/headers';
import { createJWTCookies, deleteJWTCookies } from '../_service/cookieHandler';
import { NetworkError } from '@/errors/CustomError';

export async function POST() {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value;

    if (refreshToken && accessToken) {
      const getReissueTokenResult = await getReissueToken({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      if (getReissueTokenResult.status === 'SUCCESS') {
        const { accessToken, refreshToken } = getReissueTokenResult.data;
        createJWTCookies({ accessToken, refreshToken });
      }
      return Response.json(getReissueTokenResult);
    } else {
      deleteJWTCookies();
      console.error('모든 토큰이 만료됨');
      return Response.json({
        status: 'FAIL',
        message: '모든 토큰이 만료됨',
      } as CommonRes<TAuthToken>);
    }
  } catch (error) {
    console.error(error);
    deleteJWTCookies();
    const NetworkError = error as NetworkError;

    return Response.json(
      { message: NetworkError.errorBody || 'Bad Request spring api 요청 오류' },
      { status: NetworkError.statusCode },
    );
  }
}
