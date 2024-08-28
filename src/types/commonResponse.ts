import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
// 공통 응답 타입
// export interface CommonRes<T = unknown> {
//   code: string;
//   status: string | 'FAIL' | 'SUCCESS';
//   data: T;
//   message: string | null;
// }

export type CommonRes<T = unknown> = T;

export type PagingData<T = unknown> = {
  list: T;
  currentPageNumber: number;
  hasNext: boolean;
  first: boolean;
  last: boolean;
  totalCount: number;
};

/**
 * useInfinityQuery 에서 자주사용되는 리턴값을 담았다.
 */
export type TReturnInfinityQuery<T = any> = {
  pageData: InfiniteData<CommonRes<PagingData<T>>> | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<CommonRes<PagingData<T>>, Error>>;
  isLoading?: boolean;
  isFetching?: boolean;
  status?: 'error' | 'loading' | 'idle' | 'success';
};

export type JWTDecodeInfo = {
  exp: number;
  iat: number;
  memberNo: number;
  name: string;
  profileImageUri: string;
  roles: string;
};
