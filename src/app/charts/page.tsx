import React from 'react';

import { DivColumn } from '@/components/atoms';

import HeaderBody from '@/components/templates/HeaderBody';
import { CommonRes } from '@/types/commonResponse';

import BasicLineChart from '@/components/Chart/BasicLineChart';
import {
  IRateReturnHistory,
  TLineChartData,
  getYAxisConfig,
} from '@/components/Chart';
import DividendLineChart, {
  TDividendChartData,
} from '@/components/Chart/DividendLineChart';

export interface TRate {
  rate: number;
  trdDd: string;
  clsPrc: number;
}
export interface TRateWithDividend extends TRate {
  estmStdprc: number | null;
  totalPrc: number;
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
  const dividendRateList = await loadData<CommonRes<IRateReturnHistory[]>>(
    'http://localhost:3030/json/response_with_dividend_rate.json',
  );

  const PriceLineChart = () => {
    if (dividendList?.data) {
      const dataList: TLineChartData[] = dividendList.data.map((v) => ({
        value: v.clsPrc,
        label: v.trdDd,
      }));
      const yAxisConfg = getYAxisConfig(dataList, 'price');

      return <BasicLineChart dataList={dataList} yConfig={yAxisConfg} />;
    }
  };

  const RateLineChart = () => {
    if (dividendList?.data) {
      const dataList: TLineChartData[] = dividendList.data.map((v) => ({
        value: v.rate,
        label: v.trdDd,
      }));
      const yAxisConfg = getYAxisConfig(dataList, 'rate');

      return <BasicLineChart dataList={dataList} yConfig={yAxisConfg} />;
    }
  };

  const DividendPriceLineChart = () => {
    if (dividendList?.data) {
      const dataList: TLineChartData[] = dividendList.data.map((v) => ({
        value: v.clsPrc,
        label: v.trdDd,
      }));

      const dividendDataList: TDividendChartData[] = dividendList.data.map(
        (v) => ({
          value: v.totalPrc,
          dividend: v.estmStdprc,
          label: v.trdDd,
        }),
      );
      const yAxisConfg = getYAxisConfig(dataList, 'price');

      return (
        <DividendLineChart
          dataList={dataList}
          dividendDataList={dividendDataList}
          yConfig={yAxisConfg}
        />
      );
    }
  };
  const DividendRateLineChart = () => {
    if (dividendRateList?.data) {
      const dataList: TLineChartData[] = dividendRateList.data.map((v) => ({
        value: v.rate,
        label: v.trdDd,
      }));

      const dividendRateDataList: TDividendChartData[] =
        dividendRateList.data.map((v) => ({
          value: v.totalRate,
          dividend: v.estmStdprc,
          label: v.trdDd,
        }));
      const yAxisConfg = getYAxisConfig(dividendRateDataList, 'rate');

      return (
        <DividendLineChart
          dataList={dataList}
          dividendDataList={dividendRateDataList}
          yConfig={yAxisConfg}
        />
      );
    }
  };

  return (
    <HeaderBody>
      <DivColumn className="gap-3 px-4">
        {new Date().toString()}
        {/* <p>1. 차트 수익률</p>
        {dividendList && <RateLineChart />}
        <p>2. 차트 금액</p>
        {dividendList && <PriceLineChart />} */}
        <p>3. 차트 분배금 포함 금액 차트</p>
        {dividendList && <DividendPriceLineChart />}
        <p>4. 차트 분배금 포함 수익률 차트</p>
        {dividendList && <DividendRateLineChart />}
      </DivColumn>
    </HeaderBody>
  );
}
