'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPosts } from '../_service/postService';
import { DivColumn } from '@/components/atoms';
import { Title1Regular, Body1Regular } from '@/components/atoms/Texts';

import { useRouter } from 'next/navigation';
import HeaderBody from '@/components/templates/HeaderBody';

export default function ClientPage() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const { push } = useRouter();

  return (
    <HeaderBody>
      {data &&
        data.map((v) => (
          <DivColumn key={v.id} className="border-b gap-2 p-3">
            <Title1Regular className="text-blue-400">{v.title}</Title1Regular>
            <Body1Regular>{v.body}</Body1Regular>
          </DivColumn>
        ))}
    </HeaderBody>
  );
}
