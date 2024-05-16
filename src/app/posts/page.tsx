import React from 'react';
import { getPosts } from './_service/postService';
import { DivColumn } from '@/components/atoms';
import { Body1Regular, Title1Regular } from '@/components/atoms/Texts';

import HeaderBody from '@/components/templates/HeaderBody';
import { CommonRes } from '@/types/commonResponse';
import LineChart2 from '@/components/LineChart2';

export type TRate = {
  rate: number;
  trdDd: string;
  clsPrc: string;
};

async function loadData() {
  try {
    // console.time('response_max.json');
    const response = await fetch(
      // 'http://localhost:3030/json/response_max.json',
      // 'http://192.168.1.9:9090/i-routine/api/v1/etf/069660/rate-return-history?chartRangeTypeCode=MAX',
      'http://localhost:3030/json/response_1715564554552.json',
    );
    // console.timeEnd('response_max.json');
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

  return (
    <HeaderBody>
      <DivColumn className="gap-3 px-4">
        {new Date().toString()}
        <p>1. 차트</p>
        {rateList && <LineChart2 chartData={rateList?.data} />}
        {data.map((v) => (
          <DivColumn key={v.id} className="border-b gap-2 p-3">
            <Title1Regular className="text-blue-400">{v.title}</Title1Regular>
            <Body1Regular>{v.body}</Body1Regular>
          </DivColumn>
        ))}
      </DivColumn>
    </HeaderBody>
  );
}
