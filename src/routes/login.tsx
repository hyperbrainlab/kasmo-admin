import { MouseEvent, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Notification, { NotificationType } from "src/components/Notification";
import { login } from "src/apis/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: NotificationType;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userId = data.get("userId");
    const password = data.get("password");

    try {
      const response = await login({
        userId: userId as string,
        password: password as string,
      });

      console.log(response);

      localStorage.setItem("token", response.data.accessToken);

      // if (token) {
      //   setNotification({
      //     open: true,
      //     message: "Login success",
      //     type: "success",
      //   });
      // }

      navigate("/");
    } catch {
      setNotification({
        open: true,
        message: "Login failed",
        type: "error",
      });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              autoComplete="userId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleClose}
      />
    </>
  );
}
