import React from 'react';
import { getPosts } from './_service/postService';
import { DivColumn } from '@/components/atoms';
import { Body1Regular, Title1Regular } from '@/components/atoms/Texts';

import LineChart from '@/components/LineChart';
import HeaderBody from '@/components/templates/HeaderBody';
import { CommonRes } from '@/types/commonResponse';
import LineChart2 from '@/components/LineChart2';

type TRate = {
  rate: number;
  trdDd: string;
  clsPrc: string;
};

async function loadData() {
  try {
    const response = await fetch(
      'http://localhost:3030/json/response_1715564554552.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as CommonRes<TRate[]>;
    return data;
  } catch (e) {
    console.error('Failed to fetch the data.json file:', e);
  }
}

export default async function page() {
  const data = await getPosts();
  const rateList = await loadData();

  let maxValue = 0;
  let minValue = 0;
  if (rateList && rateList.data?.length) {
    maxValue = Math.max(...rateList.data.map((v) => v.rate));
    minValue = Math.min(...rateList.data.map((v) => v.rate));
  }

  console.log('minValue :: ', minValue);
  console.log('maxValue :: ', maxValue);

  return (
    <HeaderBody>
      <>
        {new Date().toString()}
        <LineChart />
        {/* <LineChart2 /> */}
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
