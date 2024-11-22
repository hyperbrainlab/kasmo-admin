import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "bizName", headerName: "Business Name", width: 130 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "profileImageUrl",
    headerName: "Profile Image",
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  { field: "phoneNo", headerName: "Phone", width: 170 },
  {
    field: "provider",
    headerName: "Provider",
    width: 130,
    renderCell: (params) => {
      const value = params?.value;

      const label = value ? value.split("_").join(" ").toUpperCase() : "";

      if (!label) return null;

      return <Chip label={label} color="primary" size="small" />;
    },
  },
  {
    field: "userType",
    headerName: "User Type",
    width: 130,
    renderCell: (params) => {
      let userType = "USER";

      switch (params?.value) {
        case 2:
          userType = "BUSINESS OWNER";
          break;
        case 3:
          userType = "ADVERTISER";
          break;
        case 4:
          userType = "ADMIN";
          break;
      }

      return (
        <Chip
          label={userType?.split("_").join(" ")?.toUpperCase()}
          color="primary"
          size="small"
        />
      );
    },
  },
  {
    field: "company",
    headerName: "Company",
    width: 130,
    renderCell: () => {
      return <></>;
    },
  },
];

export { columns };
