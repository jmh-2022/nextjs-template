import { DivColumn, MainColumn } from '@/components/atoms';
import HeaderBack from '@/components/organisms/HeaderBack';
import React from 'react';
import { getPost } from '../_service/postService';
import { Title2SemiBold } from '@/components/atoms/Texts';
import Body from '@/components/templates/Body';
import PostForm from '../_components/PostForm';

export default async function Page({ params }: { params: { postNo: string } }) {
  const data = await getPost(params.postNo);

  return (
    <>
      <HeaderBack />
      <MainColumn className="gap-10 mt-10 px-4">
        <PostForm {...data} />
      </MainColumn>
    </>
  );
}
