'use client';
import { NextButton } from '@/components/nextui/NextButton';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostCRD } from '../usePost';

import * as yup from 'yup';
import { TPost } from '../_service/postService';

interface Inputs extends Pick<TPost, 'title' | 'body'> {}

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

type PostFormProps = Partial<TPost>;

export default function PostForm(defaultValue: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });
  const { createPost, updatePost } = usePostCRD();
  const { back } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (defaultValue.id && defaultValue.userId) {
      updatePost(
        { ...data, id: defaultValue.id, userId: defaultValue.userId },
        { onSuccess: back },
      );
    } else {
      createPost(data, { onSuccess: back });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <NextButton size="sm" className="w-4" onClick={handleSubmit(onSubmit)}>
        저장
      </NextButton>
      <Input
        type="text"
        label="Title"
        {...register('title')}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
      />
      <Textarea
        label="Contents"
        placeholder="Enter your contents"
        {...register('body')}
        errorMessage={errors.body?.message}
        isInvalid={!!errors.body}
      />
    </form>
  );
}
