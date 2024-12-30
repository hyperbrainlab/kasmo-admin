import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";

import { columns } from "./constants/table";
import { useQuery } from "@tanstack/react-query";
import {
  generateRows,
  mapCategoryToLabel,
  mapSubCategoryToLabel,
} from "./utils";
import {
  bulkDeleteBanner,
  createBanner,
  getBanner,
  updateBanner,
} from "src/apis/banner";
import { useMemo, useState } from "react";
import { BannerResponse } from "src/types/banner";
import { Categories, SubCategories } from "src/types/post";
import Notification, { NotificationType } from "src/components/Notification";

export default function BannerPage() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data = [], refetch } = useQuery({
    queryKey: ["banner"],
    queryFn: getBanner,
    select: (data) => generateRows(data.data),
  });

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRow, setSelectedRow] = useState<BannerResponse | null>(null);

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

  const [formData, setFormData] = useState<BannerResponse>(
    selectedRow || {
      id: 0,
      category: Categories.BUSINESS_MEETINGS,
      subCategory: SubCategories.ADVERTISEMENT,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      order: 0,
      imageUrl: "",
      description: "",
      enabled: true,
    }
  );

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;

    try {
      const ids = selectedRows.map((id) => id as number);
      await bulkDeleteBanner(ids);

      handleSuccess();
      refetch();
    } catch {
      handleError();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFormData({
        ...formData,
        imageUrl: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSelectChange = (
    event: SelectChangeEvent<Categories | SubCategories>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      if (selectedFile) {
        formDataToSend.append("file", selectedFile);
      }

      formDataToSend.append("category", formData.category);
      formDataToSend.append("subCategory", formData.subCategory);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("order", formData.order.toString());
      formDataToSend.append("description", formData.description);
      formDataToSend.append("enabled", formData.enabled.toString());

      if (formData.id) {
        if (!selectedRow) return;
        await updateBanner(selectedRow.id, formDataToSend);
      } else {
        await createBanner(formDataToSend);
      }

      handleSuccess();
      setOpen(false);
      setSelectedFile(null);
      refetch();
    } catch {
      handleError();
    }
  };

  const transformedColumns = useMemo(
    () =>
      columns.map((column: GridColDef) =>
        column.field === "edit"
          ? {
              ...column,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedRow(params.row as Omit<BannerResponse, "owner">);
                    setFormData(params.row as Omit<BannerResponse, "owner">);
                    setSelectedFile(null);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
              ),
            }
          : column
      ),
    []
  );

  function Toolbar() {
    return (
      <GridToolbarContainer>
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => {
            setSelectedRow(null);
            setSelectedFile(null);
            setFormData({
              id: 0,
              category: Categories.BUSINESS_MEETINGS,
              subCategory: SubCategories.ADVERTISEMENT,
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              order: 0,
              imageUrl: "",
              description: "",
              enabled: true,
            });
            setOpen(true);
          }}
        >
          생성
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          size="small"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          선택 삭제
        </Button>
      </GridToolbarContainer>
    );
  }

  const hasEmpty =
    !formData.category ||
    !formData.subCategory ||
    !formData.startDate ||
    !formData.endDate ||
    !formData.description ||
    !(selectedFile || formData.imageUrl);

  return (
    <>
      <Box style={{ flex: 1 }}>
        <Typography variant="h4" component="h4">
          배너
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
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slots={{ toolbar: Toolbar }}
          checkboxSelection
          onRowSelectionModelChange={setSelectedRows}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>카테고리</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
            >
              {Object.values(Categories).map((category) => (
                <MenuItem key={category} value={category}>
                  {mapCategoryToLabel(category)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>서브 카테고리</InputLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleSelectChange}
            >
              {Object.values(SubCategories).map((subCategory) => (
                <MenuItem key={subCategory} value={subCategory}>
                  {mapSubCategoryToLabel(subCategory)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="시작일"
            name="startDate"
            type="date"
            value={
              formData.startDate
                ? dayjs(formData.startDate).format("YYYY-MM-DD")
                : ""
            }
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="종료일"
            name="endDate"
            type="date"
            value={
              formData.endDate
                ? dayjs(formData.endDate).format("YYYY-MM-DD")
                : ""
            }
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="순서"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleInputChange}
            fullWidth
          />

          {/* 파일 업로드로 변경 */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                {selectedFile ? selectedFile.name : "Upload Image"}
              </Button>
            </label>
          </Box>

          {/* 이미지 미리보기 */}
          {(selectedFile || formData.imageUrl) && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={formData.imageUrl}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}

          <TextField
            margin="dense"
            label="설명"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography>활성여부</Typography>
            <Switch
              name="enabled"
              checked={formData.enabled}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  enabled: e.target.checked,
                });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary" disabled={hasEmpty}>
            저장
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
