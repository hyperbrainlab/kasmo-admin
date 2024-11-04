import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "category",
    headerName: "Category",
    width: 170,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    width: 170,
  },
];

export { columns };
