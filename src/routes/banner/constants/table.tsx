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
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 200,
  },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  {
    field: "order",
    headerName: "Order",
    type: "number",
    width: 120,
  },
  {
    field: "enabled",
    headerName: "Enabled",
    type: "boolean",
    width: 120,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 90,
  },
];

export { columns };
