import {
  Avatar,
  Button,
  CssBaseline,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack justifyContent={"center"} width={"40%"} mt={10}>
        <CssBaseline />
        <Stack spacing={2}>
          <Stack spacing={3} alignItems={"center"} direction={"column"}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign In</Typography>
          </Stack>
          <Stack direction={"column"} spacing={2}>
            <TextField
              //   onChange={(event)=>handelAccount("username",event)}
              variant="outlined"
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              //   onChange={(event)=>handelAccount("password",event)}
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              disableElevation
              variant="contained"
              color="primary"
              fullWidth
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="button"
                  sx={{
                    color: "white",
                  }}
                >
                  Sign In
                </Typography>
              </Link>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
