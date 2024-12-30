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
    field: "thumnailImageUrl",
    headerName: "이미지",
    type: "string",
    width: 90,
    align: "center",
    headerAlign: "center",
    renderCell: (params) =>
      params.value ? (
        <img src={params.value} alt="" style={{ width: 48, height: 48 }} />
      ) : null,
  },
  {
    field: "title",
    headerName: "제목",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "body",
    headerName: "내용",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "카테고리",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const categoryLabels: { [key: string]: string } = {
        home: "홈",
        job_listings: "구인구직",
        used_goods: "중고거래",
        real_estate: "부동산",
        pickup_moving: "픽업/이사",
        chat: "속닥속닥",
        qna: "질문방",
        meetings: "모임",
        currency_exchange: "환전",
        business_meetings: "업소모임",
      };
      return (
        <Chip
          label={categoryLabels[params.value] || params.value}
          color="primary"
          size="small"
        />
      );
    },
  },
  {
    field: "subCategory",
    headerName: "서브 카테고리",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (!params.value) return null;

      const subCategoryLabels: { [key: string]: string } = {
        home: "홈",
        employer: "구인",
        job_seeker: "구직",
        sell: "판매",
        buy: "구매",
        rent: "렌트",
        sale: "매매/전매",
        pickup_drive: "픽업/운전",
        moving: "이사",
        together: "함께해요",
        go_together: "같이가요",
        cad_to_won: "CAD to Won",
        won_to_cad: "Won to CAD",
        advertisement: "교민광고",
        discount_event: "할인 이벤트",
      };
      return (
        <Chip
          label={subCategoryLabels[params.value] || params.value}
          color="secondary"
          size="small"
        />
      );
    },
  },
  {
    field: "viewCount",
    headerName: "조회수",
    type: "number",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "pinedPost",
    headerName: "고정 게시글",
    type: "actions",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
];

export { columns };
