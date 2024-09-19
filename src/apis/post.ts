import { PostRequest, PostResponse } from "src/types/post";
import { client } from "./index";
import { Paginated } from "src/types/pagination";
import { AxiosPromise } from "axios";

export const bulkUploadPost = async (body: FormData): AxiosPromise<void> => {
  return client.post<void>("/post/bulk-upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const bulkDeletePost = async (ids: number[]): AxiosPromise<void> => {
  return client.delete<void>(`/post/bulk-delete`, { data: { ids } });
};

export const getPost = async (): AxiosPromise<Paginated<PostResponse>> => {
  return client.get<Paginated<PostResponse>>("/post");
};

export const createPost = async (
  body: PostRequest
): AxiosPromise<PostResponse> => {
  return client.post<PostResponse>("/post", body);
};

export const pinPost = async (
  id: number,
  body: Partial<PostRequest>
): AxiosPromise<PostResponse> => {
  return client.patch<PostResponse>(`/post/${id}`, body);
};

export const deletePost = async (id: number): AxiosPromise<void> => {
  return client.delete<void>(`/post/${id}`);
};
