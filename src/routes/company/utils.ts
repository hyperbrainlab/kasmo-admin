import { Company } from "src/types/company";

export const generateRows = (data: Company[]) =>
  data.map((company) => ({
    id: company?.id,
    name: company?.name,
    category: company?.category,
    owner: company?.owner,
    telNo: company?.telNo,
    email: company?.email,
    website: company?.website,
    address: company?.address,
  }));
