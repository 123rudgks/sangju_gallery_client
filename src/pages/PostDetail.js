// * : 라이브러리
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// * : Components
import Home from "./Home";

function PostDetail() {
  // * : states 및 변수들
  const [postInfo, setPostInfo] = useState({});
  const [likes, setLikes] = useState([]);
  const [hates, setHates] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  // * : 함수
  let { postId } = useParams();
  const TextArea = (props) => <textarea cols="100" rows="5" {...props} />;
  // 좋아요 버튼 클릭 시 이벤트
  const onLike = async () => {
    await axios
      .post(`http://localhost:3001/likes`, { PostId: postId })
      .then((response) => {
        setLikes(likes.concat("tempLikeAtClientSide"));
      });
  };
  // 싫어요 버튼 클릭 시 이벤트
  const onHate = async () => {
    await axios
      .post(`http://localhost:3001/hates`, { PostId: postId })
      .then((response) => {
        setHates(hates.concat("tempHateAtClientSide"));
      });
  };
  // 댓글 등록 버튼 클릭 시 이벤트
  const onCommentSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/Comments", data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
      setCommentsList(commentsList.concat(response.data));
      resetForm();
    });
  };
  const onDeleteComment = ()=>{
    // ToDO : 비밀번호 체크
    // todo : 비밀번호 맞으면 삭제, 아니면 alert
  }

  // * : 기타 등등

  const initialValues = {
    username: "",
    password: "",
    commentBody: "",
    PostId: postId,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("닉네임을 입력해주세요"),
    password: Yup.string().required("비밀번호를 입력해주세요"),
  });

  useEffect(async () => {
    // post 정보 받아오기
    await axios
      .get(`http://localhost:3001/posts/${postId}`)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setPostInfo(response.data);
      });
    // likes 정보 받아오기
    await axios
      .get(`http://localhost:3001/likes/${postId}`)
      .then((response) => {
        setLikes(response.data);
      });
    // hates 정보 받아오기
    await axios
      .get(`http://localhost:3001/hates/${postId}`)
      .then((response) => {
        setHates(response.data);
      });
    // comments 정보 받아오기
    await axios
      .get(`http://localhost:3001/comments/${postId}`)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setCommentsList(response.data);
      });
  }, [postId]);

  return (
    <article>
      <div className="float-clear post-header-container">
        <div className="post-header-title">{postInfo.title}</div>
        <span className="float-left right-vertical-bar">
          {postInfo.username}
        </span>
        <span className="float-left">{postInfo.updatedAt}</span>
        <button className="float-right">댓글 {commentsList.length}</button>
        <span className="float-right right-vertical-bar">추천</span>
        <span className="float-right right-vertical-bar">조회</span>
      </div>

      <div className="post-body-container">
        <div className="post-text">{postInfo.postText}</div>
        <div className="post-likes-hates">
          {likes.length}
          <button onClick={onLike}>like</button>
          <button onClick={onHate}>hate</button>
          {hates.length}
        </div>
      </div>

      <div className="post-footer-container">
        <div className="float-clear post-footer-header">
          <span className="float-left">전체댓글 {commentsList.length}개</span>
          <select className="float-left">
            <option>등록순</option>
          </select>
          <span className="float-right">새로고침</span>
          <span className="float-right">댓글달기</span>
          <span className="float-right">본문보기</span>
        </div>

        <div className="post-comments">
          {commentsList.map((comment, index) => {
            return (
              <div className="comment-container">
                <div className="comment-user">{comment.username}</div>
                <div className="comment-text">{comment.commentBody}</div>
                <div className="comment-password-check">
                  <input></input>
                  <button>확인</button>
                  <button>취소</button>
                </div>
                <div className="comment-date">{comment.updatedAt}</div>
                <button onClick={onDeleteComment}>x</button>
              </div>
            );
          })}
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onCommentSubmit}
      >
        <Form>
          <div className="write-comment-container">
            <div className="write-comment-left">
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
            </div>
            <div className="write-comment-right">
              <Field
                as={TextArea}
                autoComplete="off"
                id="inputCreatePost"
                name="commentBody"
              />
              <div className="float-clear">
                <button className="float-right" type="submit">
                  등록 + 추천
                </button>
                <button className="float-right" type="submit">
                  등록
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <Home postId={postId}/>
    </article>
  );
}

export default PostDetail;
