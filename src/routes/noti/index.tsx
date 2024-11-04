import { Box, Button, TextField, FormControl } from "@mui/material";

import { useState } from "react";
import { sendNotificationMulticast } from "src/apis/notification";
import Notification, { NotificationType } from "src/components/Notification";

export default function CompanyPage() {
  const [isLoading, setIsLoading] = useState(false);

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

  const [formData, setFormData] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);

      await sendNotificationMulticast(formData);

      handleSuccess();
    } catch {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const hasEmpty = !formData.title || !formData.body;

  return (
    <Box style={{ flex: 1 }}>
      <FormControl fullWidth margin="dense">
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          rows={4}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Body"
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          rows={4}
          fullWidth
        />
        <Button
          style={{ width: 240, height: 52, alignSelf: "flex-end" }}
          variant="contained"
          color="primary"
          size="small"
          component="span"
          disabled={hasEmpty || isLoading}
          onClick={handleSend}
        >
          Send
        </Button>
      </FormControl>

      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleClose}
      />
    </Box>
  );
}
