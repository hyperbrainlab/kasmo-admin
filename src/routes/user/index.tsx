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
import { getUser, updateUser } from "src/apis/user";
import { generateRows as generateUserRows } from "./utils";
import { generateRows as generateCompanyRows } from "../company/utils";
import { useMemo, useState } from "react";

import { getCompany } from "src/apis/company";
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

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (data) => generateUserRows(data.data),
  });

  const { data: companyData = [] } = useQuery({
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
      message: "Operation was successful!",
      type: "success",
    });
  };

  const handleError = () => {
    setNotification({
      open: true,
      message: "Something went wrong!",
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
                  Select Company
                </Button>
              ),
            }
          : column
      ),
    []
  );

  const handleConfirm = async () => {
    try {
      if (!selectedCompanyRow || !selectedUserRow) return;

      await updateUser(selectedUserRow.id, {
        companyId: selectedCompanyRow.id,
      });

      refetch();
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
          User
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
          pageSizeOptions={[10, 20]}
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
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={companyData}
              columns={companyColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[10, 20]}
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
            Confirm
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            color="secondary"
          >
            Close
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
