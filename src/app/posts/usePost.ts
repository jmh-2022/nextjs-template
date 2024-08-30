import { useMutation } from '@tanstack/react-query';
import { postPosts, putPosts } from './_service/postService';

export const usePostCRD = () => {
  const { mutate: createPost } = useMutation({
    mutationFn: postPosts,
  });
  const { mutate: updatePost } = useMutation({
    mutationFn: putPosts,
  });

  return {
    createPost,
    updatePost,
  };
};
