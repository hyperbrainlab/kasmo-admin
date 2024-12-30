import { BannerResponse } from "src/types/banner";
import { client } from "./index";
import { AxiosPromise } from "axios";

export const getBanner = async (query: {
  limit: number;
}): AxiosPromise<BannerResponse[]> => {
  return client.get<BannerResponse[]>("/banner", { params: query });
};

export const bulkDeleteBanner = async (ids: number[]): AxiosPromise<void> => {
  return client.delete<void>(`/banner/bulk-delete`, { data: { ids } });
};

export const deleteBanner = async (id: number): AxiosPromise<void> => {
  return client.delete<void>(`/banner/${id}`);
};

export const createBanner = async (
  formData: FormData
): AxiosPromise<BannerResponse> => {
  return client.post<BannerResponse>("/banner", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateBanner = async (
  id: number,
  formData: FormData
): AxiosPromise<BannerResponse> => {
  return client.put<BannerResponse>(`/banner/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
