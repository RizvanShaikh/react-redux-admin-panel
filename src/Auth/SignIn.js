import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import * as yup from "yup";
import { Formik } from "formik";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const [notFoundUser, setNotFoundUser] = React.useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const currentValue = useSelector((state) => state.users?.user);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setNotFoundUser(false);
  };

  const onSubmit = (signInData) => {
    const userfound = currentValue.find(
      (user) =>
        user?.email === signInData?.email &&
        user?.password === signInData?.password
    );
    console.log("userfound", userfound);
    if (userfound && userfound.email) {
      console.log("in iffff");
      setNotFoundUser(false);
      setOpen(true);
      navigate("/dashboard");
    } else {
      console.log("in else");
      setNotFoundUser(true);
      setOpen(false);
      navigate("/");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values) => {
          onSubmit(values);
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required("Email is required"),
          password: yup.string().required("Password is required"),
        })}
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;

          return (
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />

                {/* Snake Bar Starts */}
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Sign in Successfully!
                  </Alert>
                </Snackbar>

                <Snackbar
                  open={notFoundUser}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="warning"
                    sx={{ width: "100%" }}
                  >
                    Invalid credential!
                  </Alert>
                </Snackbar>
                {/* Snake Bar Ends */}
                <Box
                  sx={{
                    marginTop: 8,
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
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      autoFocus
                    />
                    {touched.email && errors.email && (
                      <div style={{ color: "red", float: "left" }}>
                        {errors.email}
                      </div>
                    )}

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      id="password"
                      autoComplete="current-password"
                    />
                    {touched.password && errors.password && (
                      <div style={{ color: "red", float: "left" }}>
                        {errors.password}
                      </div>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link to="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          );
        }}
      </Formik>
    </>
  );
}
