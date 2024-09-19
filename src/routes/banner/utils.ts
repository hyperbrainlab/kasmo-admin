import { BannerResponse } from "src/types/banner";

export const generateRows = (data: BannerResponse[]) =>
  data.map((banner) => ({
    id: banner?.id,
    category: banner?.category,
    subCategory: banner?.subCategory,
    startDate: banner?.startDate,
    endDate: banner?.endDate,
    order: banner?.order,
  }));
