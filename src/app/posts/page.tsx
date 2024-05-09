import React from 'react';
import { getPosts } from './_service/postService';
import { DivColumn, DivRow, MainColumn } from '@/components/atoms';
import { Body1Regular, Title1Regular } from '@/components/atoms/Texts';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import LineChart from '@/components/LineChart';

export default async function page() {
  const data = await getPosts();

  return (
    <MainColumn className="p-4">
      <DivRow className="gap-4">
        <Button
          variant={'grey'}
          size={'md'}
          label="서버"
          className="text-black"
        />
        <Link href={'/posts/client'}>
          <Button
            variant={'grey'}
            size={'md'}
            label="클라이언트"
            className="text-white"
          />
        </Link>
      </DivRow>
      <LineChart />
      {data.map((v) => (
        <DivColumn key={v.id} className="border-b gap-2 p-3">
          <Title1Regular className="text-blue-400">{v.title}</Title1Regular>
          <Body1Regular>{v.body}</Body1Regular>
        </DivColumn>
      ))}
    </MainColumn>
  );
}
