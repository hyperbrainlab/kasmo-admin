import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { UserProfileResponse } from "src/types/user";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 90,
  },
  {
    field: "category",
    headerName: "Category",
    width: 90,
    renderCell: (params) => (
      <Chip
        label={params?.value?.split("_").join(" ")?.toUpperCase()}
        color="primary"
        size="small"
      />
    ),
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 90,
    valueGetter: (value: UserProfileResponse) => value?.name || "",
  },
  {
    field: "telNo",
    headerName: "Tel No.",
    width: 90,
  },
  {
    field: "email",
    headerName: "Email",
    width: 170,
  },
  {
    field: "website",
    headerName: "Web Site",
    width: 170,
  },
  {
    field: "address",
    headerName: "Address",
    width: 170,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 90,
  },
];

export { columns };
