import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "category",
    headerName: "카테고리",
    width: 170,
  },
  {
    field: "subCategory",
    headerName: "서브 카테고리",
    width: 170,
  },
  {
    field: "startDate",
    headerName: "시작일",
    width: 200,
  },
  {
    field: "endDate",
    headerName: "종료일",
    width: 200,
  },
  {
    field: "imageUrl",
    headerName: "이미지",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  {
    field: "order",
    headerName: "순서",
    type: "number",
    width: 120,
  },
  {
    field: "enabled",
    headerName: "활성여부",
    type: "boolean",
    width: 120,
  },
  {
    field: "edit",
    headerName: "수정",
    width: 90,
  },
];

export { columns };
