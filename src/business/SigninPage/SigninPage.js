import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { SigninPageStyles } from "./styles";
import Signin from "../../components/Signin/Signin";
import Signup from "../../components/Signup/Signup";

function Copyright(props) {
  return (
    <Box marginTop={3}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          William Duarte
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

const theme = createTheme();

export default function SigninPage() {
  const [type, setType] = useState("signin");
  const classes = SigninPageStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className={classes.container}
        container
        component="main"
        sx={{ width: "100%", height: "100vh" }}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              {type === "signin" ? <Signin /> : <Signup />}
            </Box>
            <Box textAlign="end" width="100%" container>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => setType(type === "signin" ? "signup" : "signin")}
                variant="body2"
              >
                {type === "signin"
                  ? "Ainda não possui uma conta? Cadastre-se Já!"
                  : "Já possui uma conta? Entre Já!"}
              </Link>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
