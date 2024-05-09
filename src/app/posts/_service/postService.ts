import { callFetchGet, callFetchPost } from '@/service/apiClient';
import { CommonRes } from '@/types/commonResponse';

const POSTS = `/posts`;

type TPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<TPosts[]> {
  return await callFetchGet(POSTS);
}
