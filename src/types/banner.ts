import { Categories, SubCategories } from "./post";

export type BannerResponse = {
  id: number;
  category: Categories;
  subCategory: SubCategories;
  startDate: string;
  endDate: string;
  order: number;
  imageUrl: string;
  description: string;
  enabled: boolean;
};

export type CreateBannerRequest = Omit<BannerResponse, "id">;

export type UpdateBannerRequest = Partial<CreateBannerRequest>;
