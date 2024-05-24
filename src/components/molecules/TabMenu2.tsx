'use client';
import React, { useState, useEffect } from 'react';

interface Tab {
  label: string;
  content: string;
}

const tabs: Tab[] = [
  { label: '인기', content: '인기 콘텐츠' },
  { label: '테마', content: '테마 콘텐츠' },
  { label: '지수', content: '지수 콘텐츠' },
  { label: '채권', content: '채권 콘텐츠' },
  { label: '상품', content: '상품 콘텐츠' },
];

const TabMenu2: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">ETF 분류</h1>
      <ul className="relative flex border-b border-gray-300 justify-between">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`cursor-pointer px-4 py-2 ${index === activeTab ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </li>
        ))}
        <div
          className="absolute bottom-0 h-0.5 bg-black transition-transform duration-300"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * activeTab}%`,
          }}
        />
      </ul>
      <div className="tab-content mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabMenu2;
