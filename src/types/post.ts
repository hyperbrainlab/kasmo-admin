export enum Categories {
  HOME = "home",
  JOB_LISTINGS = "job_listings", // 구인구직
  USED_GOODS = "used_goods", // 중고거래
  REAL_ESTATE = "real_estate", // 부동산
  PICKUP_MOVING = "pickup_moving", // 픽업/이사
  CHAT = "chat", // 속닥속닥
  QNA = "qna", // 질문방
  MEETINGS = "meetings", // 모임
  CURRENCY_EXCHANGE = "currency_exchange", // 환전
  BUSINESS_MEETINGS = "business_meetings", // 업소모임
}

export enum SubCategories {
  HOME = "home",
  // Job Listings
  EMPLOYER = "employer", // 구인
  JOB_SEEKER = "job_seeker", // 구직
  // Used Goods
  SELL = "sell", // 판매
  BUY = "buy", // 구매
  // Real Estate
  RENT = "rent", // 렌트
  SALE = "sale", // 매매/전매
  // Pickup/Moving
  PICKUP_DRIVE = "pickup_drive", // 픽업/운전
  MOVING = "moving", // 이사
  // Meetings
  TOGETHER = "together", // 함께해요
  GO_TOGETHER = "go_together", // 같이가요
  // Currency Exchange
  CAD_TO_WON = "cad_to_won", // CAD to Won
  WON_TO_CAD = "won_to_cad", // Won to CAD
  // Business Meetings
  ADVERTISEMENT = "advertisement", // 교민광고
  DISCOUNT_EVENT = "discount_event", // 할인 이벤트
}

export type PostResponse = {
  id: number;
  title: string;
  body: string;
  category: Categories;
  subCategory: SubCategories;
  thumnailImageUrl: string;
  viewCount: number;
  isAdvertise: boolean;
};

export type PostRequest = Pick<
  PostResponse,
  | "title"
  | "body"
  | "category"
  | "subCategory"
  | "thumnailImageUrl"
  | "isAdvertise"
>;
