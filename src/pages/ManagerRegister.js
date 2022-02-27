// * : libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TextField from "@mui/material/TextField";

function ManagerRegister() {
  const navigate = useNavigate();
  const initialValues = {};
  const onSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      email: "",
      id: "",
      password: "",
      passwordCheck: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="manager-container">
        <div className="back-arrow">
          <ThemeProvider theme={theme}>
            <IconButton
              aria-label="move-back"
              color="backArrow"
              onClick={() => navigate("/manager-login")}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </ThemeProvider>
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            required
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.id}
            helperText={formik.touched.id && formik.errors.id}
            id="outlined-basic"
            label="Id"
            variant="outlined"
          />
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            required
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            required
            type="password"
            value={formik.values.passwordCheck}
            onChange={formik.handleChange}
            error={formik.touched.passwordCheck && formik.errors.passwordCheck}
            helperText={
              formik.touched.passwordCheck && formik.errors.passwordCheck
            }
            id="outlined-basic"
            label="Password again"
            variant="outlined"
          />
        </div>
        <div>
          <button onSubmit={onSubmit}>회원가입</button>
        </div>
      </div>
    </form>
  );
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email(" Invalid email").required(" Required"),
  id: Yup.string().required(" Required"),
  password: Yup.string().required(" Required"),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password"), null], " not Match")
    .required(" Required"),
});

const theme = createTheme({
  status: {},
  palette: {
    backArrow: {
      main: "#219f94",
    },
  },
});

export default ManagerRegister;
