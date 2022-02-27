// * : librarys
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// * : components
import Home from "./Home";

function NewPost() {
  // * : functions
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios.post("https://sangju-gallery.herokuapp.com/posts", data).then((response) => {
      if (!response.data.error) {
        navigate("/", { replace: true });
      }
    });
  };
  const TextArea = (props) => <textarea cols="204" rows="16" {...props} />;
  // * : etc..
  const initialValues = {
    username: "",
    password: "",
    title: "",
    postText: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("닉네임을 입력해주세요"),
    password: Yup.string().required("비밀번호를 입력해주세요"),
  });

  return (
    <article>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="닉네임을 입력해주세요"
          />
          <Field
            type="password"
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="제목을 입력해주세요"
          />
          <Field
            as={TextArea}
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
          />
          <button type="reset">초기화</button>
          <button type="submit">등록</button>
        </Form>
      </Formik>
      <Home />
    </article>
  );
}

export default NewPost;
