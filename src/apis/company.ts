import {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "src/types/company";
import { client } from "./index";
import { AxiosPromise } from "axios";
import { Paginated } from "src/types/pagination";

export const getCompany = async (): AxiosPromise<Paginated<Company>> => {
  return client.get<Paginated<Company>>("/biz");
};

export const bulkUploadCompany = async (body: FormData): AxiosPromise<void> => {
  return client.post<void>("/biz/bulk-upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const bulkDeleteCompany = async (ids: number[]): AxiosPromise<void> => {
  return client.delete<void>(`/biz/bulk-delete`, { data: { ids } });
};

export const createCompany = async (
  body: CreateCompanyRequest
): AxiosPromise<Company> => {
  return client.post<Company>("/biz", body);
};

export const updateCompany = async (
  id: number,
  body: UpdateCompanyRequest
): AxiosPromise<Company> => {
  return client.put<Company>(`/biz/${id}`, body);
};

export const setOwner = async (
  companyId: number,
  body: { ownerId: number }
): AxiosPromise<void> => {
  return client.patch<void>(`/biz/${companyId}/owner`, body);
};

export const deleteCompany = async (id: number): AxiosPromise<void> => {
  return client.delete<void>(`/biz/${id}`);
};
