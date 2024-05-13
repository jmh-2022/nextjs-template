'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    // onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    // onError: queryErrorHandler,
  }),
});

type Props = {
  children: ReactNode;
};

export default function RecoilWithQueryProvider({ children }: Props) {
  return (
    // Recoil이 애플리케이션의 상태를 관장하는 주된 라이브러리로서, 전체 앱을 포괄하는 것이 자연스럽다.. React Query는 데이터 페칭을 최적화하는 데 초점을 맞추고 있고, 상태 관리의 주체인 Recoil이 더 넓은 범위를 가지는 것이 적합
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
}
