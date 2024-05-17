import React from 'react';

import { DivColumn } from '@/components/atoms';

import HeaderBody from '@/components/templates/HeaderBody';
import { CommonRes } from '@/types/commonResponse';

import { getYAxisConfig, getYAxisConfig2 } from '@/components/Chart/util';
import LineChartPrice from '@/components/Chart/LineChartPrice';
import LineChart from '@/components/Chart';
import LineChartTest, {
  TLineChartData,
} from '@/components/Chart/LineChartTest';

export interface TRate {
  rate: number;
  trdDd: string;
  clsPrc: number;
}
export interface TRateWithDividend extends TRate {
  estmStdprc?: any;
  totalPrc?: number;
}

async function loadData<T>(url: string) {
  try {
    // console.time('response_max.json');
    const response = await fetch(
      // 'http://localhost:3030/json/response_max.json',
      //   'http://192.168.1.9:9090/i-routine/api/v1/etf/069660/rate-return-history?chartRangeTypeCode=MAX',
      url,
    );
    // console.timeEnd('response_max.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as T;
    return data;
  } catch (e) {
    console.error('Failed to fetch the data.json file:', e);
  }
}

export default async function page() {
  const rateList = await loadData<CommonRes<TRate[]>>(
    'http://localhost:3030/json/response_1715564554552.json',
  );
  const dividendList = await loadData<CommonRes<TRateWithDividend[]>>(
    'http://localhost:3030/json/response_with_dividend.json',
  );

  if (rateList?.data) {
    const yAxisConfg = getYAxisConfig(rateList.data, 'price');
  }
  const NewLineChart = () => {
    if (dividendList?.data) {
      const dataList: TLineChartData[] = dividendList.data.map((v) => ({
        value: v.clsPrc,
        label: v.trdDd,
      }));
      const yAxisConfg = getYAxisConfig2(dataList, 'price');

      return <LineChartTest dataList={dataList} yConfig={yAxisConfg} />;
    }
  };

  return (
    <HeaderBody>
      <DivColumn className="gap-3 px-4">
        {new Date().toString()}
        <p>1. 차트 수익률</p>
        {/* {rateList && <LineChart chartData={rateList?.data} />} */}
        <p>2. 차트 금액</p>
        {rateList && <LineChartPrice chartData={rateList?.data} />}
        <p>3. 차트 분배금 포함 수익률 차트</p>
        {dividendList && <LineChart chartData={dividendList?.data} />}
        <p>4. 차트 분배금 포함 금액 차트</p>
        {dividendList && <NewLineChart />}
      </DivColumn>
    </HeaderBody>
  );
}
