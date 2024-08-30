'use client';

import { MainColumn } from '@/components/atoms';
import HeaderBack from '@/components/organisms/HeaderBack';
import React from 'react';

import PostForm from '../_components/PostForm';

export default function Page() {
  return (
    <>
      <HeaderBack />
      <MainColumn className="gap-10 pt-10 px-4">
        <PostForm />
      </MainColumn>
    </>
  );
}
