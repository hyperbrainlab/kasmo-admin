import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "아이디",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "이메일",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "bizName",
    headerName: "사업자명",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "이름",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "profileImageUrl",
    headerName: "프로필 이미지",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  {
    field: "phoneNo",
    headerName: "전화번호",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "provider",
    headerName: "가입수단",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const value = params?.value;

      const label = value ? value.split("_").join(" ").toUpperCase() : "";

      if (!label) return null;

      return <Chip label={label} color="primary" size="small" />;
    },
  },
  {
    field: "userType",
    headerName: "유저 유형",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      let userType = "일반사용자";

      switch (params?.value) {
        case 2:
          userType = "사업자";
          break;
        case 3:
          userType = "광고주";
          break;
        case 4:
          userType = "관리자";
          break;
      }

      return <Chip label={userType} color="primary" size="small" />;
    },
  },
  {
    field: "company",
    headerName: "주소록",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderCell: () => {
      return <></>;
    },
  },
];

export { columns };
