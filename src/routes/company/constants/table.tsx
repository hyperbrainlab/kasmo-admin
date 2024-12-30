import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { UserProfileResponse } from "src/types/user";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "아이디",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "이름",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "카테고리",
    width: 90,
    align: "center",
    headerAlign: "center",
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
    headerName: "소유자",
    width: 170,
    align: "center",
    headerAlign: "center",
    valueGetter: (value: UserProfileResponse) => value?.name || "",
  },
  {
    field: "telNo",
    headerName: "전화번호",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "이메일",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "website",
    headerName: "웹사이트",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "address",
    headerName: "주소",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "edit",
    headerName: "수정",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
];

export { columns };
