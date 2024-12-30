import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";

import { columns as userColumns } from "./constants/table";

import { columns as companyColumns } from "../company/constants/table";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "src/apis/user";
import { generateRows as generateUserRows } from "./utils";
import { generateRows as generateCompanyRows } from "../company/utils";
import { useMemo, useState } from "react";

import { getCompany, setOwner } from "src/apis/company";
import { Company } from "src/types/company";
import { UserProfileResponse } from "src/types/user";

import Notification, { NotificationType } from "src/components/Notification";

export default function UserPage() {
  const [open, setOpen] = useState(false);

  const [selectedUserRow, setSelectedUserRow] =
    useState<UserProfileResponse | null>(null);
  const [selectedCompanyRow, setSelectedCompanyRow] = useState<Company | null>(
    null
  );

  const { data: userData = [], refetch: refetchUsers } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (data) => generateUserRows(data.data),
  });

  const { data: companyData = [], refetch: refetchCompanies } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    select: (data) => generateCompanyRows(data.data.data),
  });

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: NotificationType;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const handleSuccess = () => {
    setNotification({
      open: true,
      message: "유저 추가 성공!",
      type: "success",
    });
  };

  const handleError = () => {
    setNotification({
      open: true,
      message: "유저 추가 실패!",
      type: "error",
    });
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  function Toolbar() {
    return <GridToolbarContainer></GridToolbarContainer>;
  }

  const transformedColumns = useMemo(
    () =>
      userColumns.map((column: GridColDef) =>
        column.field === "company"
          ? {
              ...column,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedUserRow(params.row as UserProfileResponse);
                    setOpen(true);
                  }}
                  size="small"
                >
                  주소록 추가
                </Button>
              ),
            }
          : column
      ),
    []
  );

  const columns = useMemo(() => {
    return companyColumns.filter((column) => column.field !== "edit");
  }, []);

  const handleConfirm = async () => {
    try {
      if (!selectedCompanyRow || !selectedUserRow) return;

      await setOwner(selectedCompanyRow.id, {
        ownerId: selectedUserRow.id,
      });

      refetchUsers();
      refetchCompanies();
      handleSuccess();
    } catch {
      handleError();
    }
  };

  return (
    <>
      <Box
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h4" component="h4">
          유저
        </Typography>
        <DataGrid
          sx={{ mt: 2 }}
          rows={userData}
          columns={transformedColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slots={{ toolbar: Toolbar }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={companyData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              onRowClick={(params) => {
                setSelectedCompanyRow(params.row);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!selectedCompanyRow}
            onClick={handleConfirm}
            color="primary"
          >
            확인
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            color="secondary"
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleClose}
      />
    </>
  );
}
