import { PostResponse } from "src/types/post";

export const generateRows = (data: PostResponse[]) =>
  data.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    category: post.category,
    subCategory: post.subCategory,
    thumnailImageUrl: post.thumnailImageUrl,
    viewCount: post.viewCount,
    isAdvertise: post.isAdvertise,
  }));
