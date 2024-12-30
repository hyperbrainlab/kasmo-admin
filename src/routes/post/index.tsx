import { Box, Typography, Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import { columns } from "./constants/table";
import { useQuery } from "@tanstack/react-query";
import {
  bulkDeletePost,
  bulkUploadPost,
  getPost,
  pinPost,
} from "src/apis/post";
import { generateRows } from "./utils";
import { ChangeEvent, useMemo, useState } from "react";
import { PostResponse } from "src/types/post";
import PushPin from "@mui/icons-material/PushPin";
import Notification, { NotificationType } from "src/components/Notification";

export default function PostPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

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
      message: "게시글 업로드 성공!",
      type: "success",
    });
  };

  const handleError = () => {
    setNotification({
      open: true,
      message: "게시글 업로드 실패!",
      type: "error",
    });
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const { data = [], refetch } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost({ limit: 50 }),
    select: (data) => generateRows(data.data.data),
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        await bulkUploadPost(formData);

        handleSuccess();
        refetch();

        event.target.value = "";
      }
    } catch {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;

    try {
      const ids = selectedRows.map((id) => id as number);

      await bulkDeletePost(ids);

      handleSuccess();
      refetch();
    } catch {
      handleError();
    }
  };

  function Toolbar() {
    return (
      <GridToolbarContainer>
        <input
          accept=".csv"
          style={{ display: "none" }}
          id="bulk-upload-file"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="bulk-upload-file">
          <Button
            variant="contained"
            color="primary"
            size="small"
            component="span"
          >
            일괄 업로드
          </Button>
        </label>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          size="small"
          onClick={handleDelete}
          disabled={selectedRows.length === 0 || isLoading}
        >
          선택 삭제
        </Button>
      </GridToolbarContainer>
    );
  }

  const transformedColumns = useMemo(() => {
    const handlePin = async (id: number, row: PostResponse) => {
      try {
        await pinPost(id, {
          isAdvertise: !row.isAdvertise,
        });

        handleSuccess();
        refetch();
      } catch {
        handleError();
      }
    };

    return columns.map((column: GridColDef) =>
      column.field === "pinedPost"
        ? {
            ...column,
            renderCell: ({ row }: { row: PostResponse }) => {
              return (
                <GridActionsCellItem
                  icon={
                    <PushPin color={row.isAdvertise ? "primary" : undefined} />
                  }
                  label="Pin"
                  onClick={() => handlePin(row.id, row)}
                />
              );
            },
          }
        : column
    );
  }, [refetch]);

  return (
    <>
      <Box
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h4" component="h4">
          게시글
        </Typography>
        <DataGrid
          sx={{ mt: 2 }}
          rows={data}
          columns={transformedColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[50]}
          slots={{ toolbar: Toolbar }}
          checkboxSelection
          onRowSelectionModelChange={setSelectedRows}
        />
      </Box>
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleClose}
      />
    </>
  );
}
