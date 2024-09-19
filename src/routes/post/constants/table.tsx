import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "thumnailImageUrl",
    headerName: "Image",
    type: "string",
    width: 90,
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  { field: "title", headerName: "Title", width: 130 },
  { field: "body", headerName: "Body", width: 130 },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params?.value?.split("_").join(" ")?.toUpperCase()}
        color="primary"
        size="small"
      />
    ),
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    width: 150,
    renderCell: (params) =>
      params?.value ? (
        <Chip
          label={params?.value?.split("_").join(" ")?.toUpperCase()}
          color="secondary"
          size="small"
        />
      ) : null,
  },
  {
    field: "viewCount",
    headerName: "View Count",
    type: "number",
    width: 90,
  },
  {
    field: "pinedPost",
    headerName: "Pinned Post",
    type: "actions",
    width: 150,
  },
];

export { columns };
