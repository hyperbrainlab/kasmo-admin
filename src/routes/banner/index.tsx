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
import dayjs from "dayjs";

import { columns } from "./constants/table";
import { useQuery } from "@tanstack/react-query";
import { generateRows } from "./utils";
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
      if (formData.id) {
        if (!selectedRow) return;

        await updateBanner(selectedRow.id, formData);
      } else {
        await createBanner(formData);
      }

      handleSuccess();

      setOpen(false);

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
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          size="small"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </Button>
      </GridToolbarContainer>
    );
  }

  const hasEmpty =
    !formData.category ||
    !formData.subCategory ||
    !formData.startDate ||
    !formData.endDate ||
    !formData.imageUrl ||
    !formData.description;

  return (
    <>
      <Box
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h4" component="h4">
          Banner
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
            >
              {Object.values(Categories).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Sub Category</InputLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleSelectChange}
            >
              {Object.values(SubCategories).map((subCategory) => (
                <MenuItem key={subCategory} value={subCategory}>
                  {subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Start Date"
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
            label="End Date"
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
            label="Order"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography>Enabled</Typography>
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
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={hasEmpty}>
            Save
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
