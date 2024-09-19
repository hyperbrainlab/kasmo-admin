import { UserProfileResponse } from "src/types/user";

export const generateRows = (data: UserProfileResponse[]) =>
  data.map((user) => ({
    id: user.id,
    email: user.email,
    bizName: user.bizName,
    name: user.name,
    profileImageUrl: user.profileImageUrl,
    phoneNo: user.phoneNo,
    provider: user.provider,
    userType: user.userType,
  }));
