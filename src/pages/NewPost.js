import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function NewPost() {
  const initialValues = {
    nickname: "",
    password: "",
    content: "",
  };
  const validationSchema = Yup.object().shape({
    nickname: Yup.string().required("닉네임을 입력해주세요"),
    password: Yup.string().required("비밀번호를 입력해주세요"),
  });
  const onSubmit = (data) => {
    console.log(data)
    // axios.post("http://localhost:3001/new-post",data).then((response)=>{
    //   console.log(response.data)
    // })
  };
  const TextArea = (props) => <textarea cols="204" rows="16" {...props} />;
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
            name="nickname"
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
            name="content"
          />
        <button type="reset">초기화</button>
        <button type="submit">등록</button>
        </Form>
      </Formik>
    </article>
  );
}

export default NewPost;
