import {
  LoginRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "src/types/user";
import { client } from "./index";
import { AxiosPromise } from "axios";

export const getUser = async (): AxiosPromise<UserProfileResponse[]> => {
  return client.get<UserProfileResponse[]>("/user");
};

export const getUserProfile = async (): AxiosPromise<UserProfileResponse> => {
  return client.get<UserProfileResponse>("/user/profile");
};

export const updateUser = async (
  id: number,
  body: UpdateUserProfileRequest
) => {
  return client.put(`/user/${id}`, body);
};

export const login = async (body: LoginRequest) => {
  return client.post("/auth/admin/login", body);
};
