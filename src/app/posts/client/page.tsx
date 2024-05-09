'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPosts } from '../_service/postService';
import { MainColumn, DivColumn, DivRow } from '@/components/atoms';
import { Title1Regular, Body1Regular } from '@/components/atoms/Texts';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function ClientPage() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const { push } = useRouter();

  return (
    <MainColumn className="p-4">
      <DivRow className="gap-4">
        <Button
          variant={'grey'}
          size={'md'}
          label="서버"
          className="text-white"
          onClick={() => push('/posts')}
        />
        <Button
          variant={'grey'}
          size={'md'}
          label="클라이언트"
          className="text-black"
          onClick={() => push('/posts/client')}
        />
      </DivRow>

      {data &&
        data.map((v) => (
          <DivColumn key={v.id} className="border-b gap-2 p-3">
            <Title1Regular className="text-blue-400">{v.title}</Title1Regular>
            <Body1Regular>{v.body}</Body1Regular>
          </DivColumn>
        ))}
    </MainColumn>
  );
}
