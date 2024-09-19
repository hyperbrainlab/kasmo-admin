import { Snackbar, Alert } from "@mui/material";

export type NotificationType = "success" | "error";

export type NotificationProps = {
  message: string;
  type: NotificationType;
  open: boolean;
  onClose: () => void;
};

export default function Notification({
  message,
  type,
  open,
  onClose,
}: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
