import {
  BannerResponse,
  CreateBannerRequest,
  UpdateBannerRequest,
} from "src/types/banner";
import { client } from "./index";
import { AxiosPromise } from "axios";

export const getBanner = async (): AxiosPromise<BannerResponse[]> => {
  return client.get<BannerResponse[]>("/banner");
};

export const bulkDeleteBanner = async (ids: number[]): AxiosPromise<void> => {
  return client.delete<void>(`/banner/bulk-delete`, { data: { ids } });
};

export const deleteBanner = async (id: number): AxiosPromise<void> => {
  return client.delete<void>(`/banner/${id}`);
};

export const createBanner = async (
  body: CreateBannerRequest
): AxiosPromise<BannerResponse> => {
  return client.post<BannerResponse>("/banner", body);
};

export const updateBanner = async (
  id: number,
  body: UpdateBannerRequest
): AxiosPromise<BannerResponse> => {
  return client.put<BannerResponse>(`/banner/${id}`, body);
};
