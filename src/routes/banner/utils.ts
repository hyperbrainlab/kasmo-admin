import { BannerResponse } from "src/types/banner";
import { Categories, SubCategories } from "src/types/post";

export const generateRows = (data: BannerResponse[]) =>
  data.map((banner) => ({
    id: banner?.id,
    category: banner?.category,
    subCategory: banner?.subCategory,
    startDate: banner?.startDate,
    endDate: banner?.endDate,
    imageUrl: banner?.imageUrl,
    order: banner?.order,
    enabled: banner?.enabled,
    description: banner?.description,
  }));

export const mapCategoryToLabel = (category: Categories) => {
  switch (category) {
    case Categories.HOME:
      return "홈";
    case Categories.JOB_LISTINGS:
      return "구인구직";
    case Categories.USED_GOODS:
      return "중고거래";
    case Categories.REAL_ESTATE:
      return "부동산";
    case Categories.PICKUP_MOVING:
      return "픽업/이사";
    case Categories.CHAT:
      return "속닥속닥";
    case Categories.QNA:
      return "질문방";
    case Categories.MEETINGS:
      return "모임";
    case Categories.CURRENCY_EXCHANGE:
      return "환전";
    case Categories.BUSINESS_MEETINGS:
      return "업소모임";
  }
};

export const mapSubCategoryToLabel = (subCategory: SubCategories) => {
  switch (subCategory) {
    case SubCategories.HOME:
      return "홈";
    case SubCategories.EMPLOYER:
      return "구인";
    case SubCategories.JOB_SEEKER:
      return "구직";
    case SubCategories.SELL:
      return "판매";
    case SubCategories.BUY:
      return "구매";
    case SubCategories.RENT:
      return "렌트";
    case SubCategories.SALE:
      return "매매/전매";
    case SubCategories.PICKUP_DRIVE:
      return "픽업/운전";
    case SubCategories.MOVING:
      return "이사";
    case SubCategories.TOGETHER:
      return "함께해요";
    case SubCategories.GO_TOGETHER:
      return "같이가요";
    case SubCategories.CAD_TO_WON:
      return "CAD to Won";
    case SubCategories.WON_TO_CAD:
      return "Won to CAD";
    case SubCategories.ADVERTISEMENT:
      return "교민광고";
    case SubCategories.DISCOUNT_EVENT:
      return "할인 이벤트";
  }
};
