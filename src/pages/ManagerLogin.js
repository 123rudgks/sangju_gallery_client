// * : libraries
import React from "react";
import {useNavigate} from "react-router-dom"
import { Formik, Field, Form } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function ManagerLogin() {
  const navigate = useNavigate();
  const initialValues = {};
  const theme = createTheme({
    status: {},
    palette: {
      backArrow: {
        main: "#219f94",
      },
    },
  });
  const onSubmit = () => {};
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <div className="manager-container">
        <div className="back-arrow">
            <ThemeProvider theme={theme}>
              <IconButton aria-label="move-back" color="backArrow" onClick={()=>navigate('/')}>
                <ArrowBackIosNewIcon />
              </IconButton>
            </ThemeProvider>
          </div>
          <div className="field-container">
            <label htmlFor="id">ID : </label>
            <Field id="id" name="id" placeholder="ID를 입력하세요" />
          </div>
          <div className="field-container">
            <label htmlFor="password">Password : </label>
            <Field
              id="password"
              name="password"
              placeholder="Password를 입력하세요"
              type="password"
            />
          </div>
          <div>
            <button onClick={()=>navigate('/manager-register')}>회원가입</button>
            <button type="submit">로그인</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default ManagerLogin;
