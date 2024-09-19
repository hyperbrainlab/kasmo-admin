export enum UserType {
  USER = 1,
  BUSINESS_OWNER = 2,
  ADVERTISER = 3,
  ADMIN = 4,
}

export enum Provider {
  EMAIL = "email",
  GOOGLE = "google",
  APPLE = "apple",
  KAKAO = "kakao",
}

export type UserProfileResponse = {
  id: number;
  uid: string;
  email: string;
  bizName: string;
  name: string;
  profileImageUrl: string;
  phoneNo: string;
  provider: Provider;
  userType: UserType;
};

export type UpdateUserProfileRequest = Partial<
  Pick<
    UserProfileResponse,
    "email" | "bizName" | "name" | "profileImageUrl" | "phoneNo" | "userType"
  > & {
    companyId: number;
  }
>;

export type LoginRequest = {
  userId: string;
  password: string;
};
