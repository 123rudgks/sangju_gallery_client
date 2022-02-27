// * : librarys
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// * : components
import Home from "./Home";

function UpdatePost() {
  // * : states
  const [postInfo, setPostInfo] = useState({});
  // * : functions
  const { postId } = useParams();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await axios
      .put(`https://sangju-gallery.herokuapp.com/posts/update-word/${postId}`, data)
      .then((response) => {
        if (!response.data.error) {
          navigate(`/post-detail/${postId}`);
        } else {
          console.log("onSubmit", response.data);
        }
      });
  };
  // * : etc..
  const initialValues = {
    username: postInfo.username,
    newTitle: postInfo.title,
    newText: postInfo.postText,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("닉네임을 입력해주세요"),
  });
  const TextArea = (props) => <textarea cols="204" rows="16" {...props} />;

  useEffect(async () => {
    // post 정보 받아오기
    await axios
      .get(`https://sangju-gallery.herokuapp.com/posts/${postId}`)
      .then((response) => {
        if (response.data.error) {
          console.log("useEffect", response.data.error);
          return;
        }
        setPostInfo(response.data);
      });
  }, []);
  return (
    <article>
      <Formik
        enableReinitialize
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
            value={postInfo.username}
          />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="newTitle"
            placeholder="제목을 입력해주세요"
          />
          <Field
            as={TextArea}
            autoComplete="off"
            id="inputCreatePost"
            name="newText"
          />
          <button type="reset">초기화</button>
          <button type="submit">등록</button>
        </Form>
      </Formik>
      <Home />
    </article>
  );
}

export default UpdatePost;
