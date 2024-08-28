import { callFetchGet } from '@/service/apiClient';

const POSTS = `/posts`;

type TPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts() {
  return await callFetchGet<TPosts[]>(POSTS);
}
