import React from 'react';
import { getPosts } from './_service/postService';
import { DivColumn } from '@/components/atoms';

import HeaderBody from '@/components/templates/HeaderBody';
import { Title1Regular, Body1Regular } from '@/components/atoms/Texts';

export default async function page() {
  const data = await getPosts();

  // const rateList = await loadData();
  // if (rateList?.data) {
  //   // const yAxisConfg = getYAxisConfig(rateList.data, 'price');
  // }

  return (
    <HeaderBody>
      <DivColumn className="gap-3 px-4">
        {new Date().toString()}
        <p>1. 차트 수익률</p>
        {/* {rateList && <LineChart chartData={rateList?.data} />} */}

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
