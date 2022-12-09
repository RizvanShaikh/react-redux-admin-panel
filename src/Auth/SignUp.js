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
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/usersSlice";

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

export default function SignUp() {

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [open, setOpen] = React.useState(false);
  const [userExist, setUserExist] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentValue = useSelector((state) => state.users?.user);

  const onSubmit = (signupData) => {
    dispatch(register({ signupData }));

    const userfound = currentValue.find(
      (user) => user?.email === signupData?.email
    );
    console.log("userfound  Add Edit User", userfound);
    if (userfound?.email) {
      setUserExist(true);
      setOpen(false);
    } else {
      setOpen(true);
      setUserExist(false);
      navigate("/");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setUserExist(false)
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
          firstName: yup.string().required("Firstname is required"),
          lastName: yup.string().required("Lastname is required"),
          email: yup.string().email().required("Email is required"),
          password: yup.string().required("Password is required"),
        })}
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;

          return (
            <>
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
                      Sign Up in Successfully!
                    </Alert>
                  </Snackbar>

                  <Snackbar
                    open={userExist}
                    autoHideDuration={2000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="warning"
                      sx={{ width: "100%" }}
                    >
                      User is already Exist!
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
                      Sign up
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            value={values.firstName}
                            required
                            fullWidth
                            id="firstName"
                            onChange={handleChange}
                            label="First Name"
                            autoFocus
                          />
                          {touched.firstName && errors.firstName && (
                            <div style={{color: "red", float: 'left'}}>
                              {errors.firstName}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            value={values.lastName}
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            autoComplete="family-name"
                          />
                          {touched.lastName && errors.lastName && (
                            <div style={{color: "red", float: 'left'}}>
                              {errors.lastName}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            value={values.email}
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            autoComplete="email"
                          />
                          {touched.email && errors.email && (
                            <div style={{color: "red", float: 'left'}}>
                              {errors.email}
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            value={values.password}
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handleChange}
                            id="password"
                            autoComplete="new-password"
                          />
                          {touched.password && errors.password && (
                            <div style={{color: "red", float: 'left'}}>
                              {errors.password}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>

                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link to="/" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Copyright sx={{ mt: 5 }} />
                </Container>
              </ThemeProvider>
            </>
          );
        }}
      </Formik>
    </>
  );
}
