import React from 'react';
import { getPosts } from './_service/postService';
import { DivColumn } from '@/components/atoms';
import { Body1Regular, Title1Regular } from '@/components/atoms/Texts';

import LineChart from '@/components/LineChart';
import HeaderBody from '@/components/templates/HeaderBody';

export default async function page() {
  const data = await getPosts();

  return (
    <HeaderBody>
      <>
        {new Date().toString()}
        <LineChart />
        {data.map((v) => (
          <DivColumn key={v.id} className="border-b gap-2 p-3">
            <Title1Regular className="text-blue-400">{v.title}</Title1Regular>
            <Body1Regular>{v.body}</Body1Regular>
          </DivColumn>
        ))}
      </>
    </HeaderBody>
  );
}
