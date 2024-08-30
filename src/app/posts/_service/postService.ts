import { callFetchGet, callFetchPost, callFetchPut } from '@/service/apiClient';

const POSTS = `/posts`;
const POST_DETAIL = `/posts/{postNo}`;

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type TReqPostPost = {
  title: string;
  body: string;
};

type TReqPutPost = TPost;
export async function getPosts() {
  return await callFetchGet<TPost[]>(POSTS);
}
export async function getPost(postNo: string) {
  const url = POST_DETAIL.replace('{postNo}', postNo);
  return await callFetchGet<TPost>(url);
}

export async function postPosts(req: TReqPostPost) {
  return await callFetchPost(POSTS, req);
}
export async function putPosts(req: TReqPutPost) {
  const url = POST_DETAIL.replace('{postNo}', String(req.id));
  return await callFetchPut(url, req);
}
