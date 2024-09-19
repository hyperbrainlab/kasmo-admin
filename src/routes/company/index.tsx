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
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import { columns } from "./constants/table";
import { useQuery } from "@tanstack/react-query";
import {
  bulkDeleteCompany,
  bulkUploadCompany,
  createCompany,
  getCompany,
  updateCompany,
} from "src/apis/company";
import { generateRows } from "./utils";
import { BusinessDirectoryCategories, Company } from "src/types/company";
import { ChangeEvent, useMemo, useState } from "react";
import Notification, { NotificationType } from "src/components/Notification";

export default function CompanyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRow, setSelectedRow] = useState<Omit<Company, "owner"> | null>(
    null
  );

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

  const [formData, setFormData] = useState<Omit<Company, "owner">>(
    selectedRow || {
      id: 0,
      name: "",
      category: BusinessDirectoryCategories.RELIGION,
      telNo: "",
      email: "",
      website: "",
      address: "",
    }
  );

  const { data = [], refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    select: (data) => generateRows(data.data.data),
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        await bulkUploadCompany(formData);

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
      await bulkDeleteCompany(ids);

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
    event: SelectChangeEvent<BusinessDirectoryCategories>
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

        await updateCompany(selectedRow.id, formData);
      } else {
        await createCompany(formData);
      }

      handleSuccess();

      setOpen(false);

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
          style={{ marginLeft: 10 }}
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
          disabled={selectedRows.length === 0 || isLoading}
        >
          Delete Selected
        </Button>
      </GridToolbarContainer>
    );
  }

  const transformedColumns = useMemo(
    () =>
      columns.map((column: GridColDef) =>
        column.field === "edit"
          ? {
              ...column,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedRow(params.row as Omit<Company, "owner">);
                    setFormData(params.row as Omit<Company, "owner">);
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

  const hasEmpty =
    !formData.name ||
    !formData.telNo ||
    !formData.email ||
    !formData.website ||
    !formData.address;

  return (
    <>
      {" "}
      <Box
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h4" component="h4">
          Company
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
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
            >
              {Object.values(BusinessDirectoryCategories).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Phone Number"
            name="telNo"
            value={formData.telNo}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
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
