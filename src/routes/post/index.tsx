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

  const { data = [], refetch } = useQuery({
    queryKey: ["post"],
    queryFn: getPost,
    select: (data) => generateRows(data.data.data),
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        await bulkUploadPost(formData);

        handleSuccess();
        refetch();
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
            Bulk Upload
          </Button>
        </label>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          size="small"
          onCanPlay={handleDelete}
          disabled={selectedRows.length === 0 || isLoading}
        >
          Delete Selected
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
              console.log(row);

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
          Post
        </Typography>
        <DataGrid
          sx={{ mt: 2 }}
          rows={data}
          columns={transformedColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[10, 20]}
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
