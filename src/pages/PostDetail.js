// * : 라이브러리
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
// * : Components
import Home from "./Home";
// * : MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Paper from "@mui/material/Paper";

function PostDetail() {
  // * : states 및 변수들
  const [postInfo, setPostInfo] = useState({});
  const [likes, setLikes] = useState(0);
  const [hates, setHates] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const [commentPassword, setCommentPassword] = useState("");
  // * : 함수
  let { postId } = useParams();
  const TextArea = (props) => <textarea cols="100" rows="5" {...props} />;
  // 좋아요 버튼 클릭 시 이벤트
  const onLike = async () => {
    await axios
      .post(`http://localhost:3001/likes`, { PostId: postId })
      .then((response) => {
        setLikes(parseInt(likes) + 1);
      });
  };
  // 싫어요 버튼 클릭 시 이벤트
  const onHate = async () => {
    await axios
      .post(`http://localhost:3001/hates`, { PostId: postId })
      .then((response) => {
        setHates(parseInt(hates) + 1);
      });
  };
  // 댓글 등록 버튼 클릭 시 이벤트
  const onCommentSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/Comments", data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
      console.log("PostDetail.js -> onCommentSubmit : ", response.data);
      setCommentsList(commentsList.concat(response.data));
      resetForm();
    });
  };
  // 댓글 삭제
  const onDeleteComment = async (commentId) => {
    await axios
      .delete(`http://localhost:3001/Comments/${commentId}`, {
        data: { newPassword: commentPassword },
      })
      .then((response) => {
        if (response.data.error) {
          alert("wrong password");
          return;
        }
        setCommentsList(
          commentsList.filter((comment) => comment.id !== commentId)
        );
        console.log(response.data);
      });
    setCommentPassword("");
  };

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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onCommentSubmit,
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
        setLikes(response.data.Likes.length);
        setHates(response.data.Hates.length);
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
  }, [postId, likes, hates]);

  return (
    <article>
      <div className="float-clear post-header-container">
        <div className="post-header-title">{postInfo.title}</div>
        <span className="float-left right-vertical-bar">
          {postInfo.username}
        </span>
        <span className="float-left">{postInfo.updatedAt}</span>
        <button className="float-right">댓글 {commentsList.length}</button>
        <span className="float-right right-vertical-bar">추천{likes} </span>
        <span className="float-right right-vertical-bar">조회</span>
      </div>

      <div className="post-body-container">
        <div className="post-text">{postInfo.postText}</div>
        <Card
          className="post-likes-hates"
          sx={{ width: "200px" }}
          variant="outlined"
        >
          <CardContent>
            {likes}
            <IconButton onClick={onLike}>
              <ThumbUpAltIcon />
            </IconButton>
            <IconButton onClick={onHate}>
              <ThumbDownAltIcon />
            </IconButton>
            {hates}
          </CardContent>
        </Card>
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TableCell align="center" sx={{ width: "100px" }}>
                    작성자
                  </TableCell>
                  <TableCell align="center" sx={{ flex: 1 }}>
                    댓글
                  </TableCell>
                  <TableCell align="center" sx={{ width: "250px" }}>
                    작성일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commentsList.map((comment, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <TableCell align="center" sx={{ width: "100px" }}>
                      {comment.username}
                    </TableCell>
                    <TableCell align="center" sx={{ flex: 1 }}>
                      {comment.commentBody}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "250px" }}>
                      {comment.updatedAt}

                    <IconButton
                    size="small"
                      onClick={(e) => {
                        // Todo: 이 부분 어떻게 더 좋게 만들까
                        setCommentPassword("");
                        // 다른 댓글 row의 password창 닫아주기
                        const classList = document.getElementsByClassName(
                          "comment-password-check"
                        );
                        while (classList.length > 0) {
                          classList[0].className = "hidden";
                        }
                        e.target.nextElementSibling.className =
                          "comment-password-check";
                      }}
                    >
                      x
                    </IconButton>
                    <div className="hidden">
                      <input
                        value={commentPassword}
                        onChange={(e) => {
                          setCommentPassword(e.target.value);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          onDeleteComment(comment.id);
                          e.target.parentElement.className = "hidden";
                        }}
                      >
                        확인
                      </button>
                      <button
                        onClick={(e) => {
                          e.target.parentElement.className = "hidden";
                          setCommentPassword("");
                        }}
                      >
                        취소
                      </button>
                    </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="write-comment-container">
        {/* <div > */}
        <div className="write-comment-left">
          <TextField
            fullWidth
            size="small"
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            name="password"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="write-comment-right">
          <TextField
            fullWidth
            multiline
            id="commentBody"
            name="commentBody"
            label="commentBody"
            value={formik.values.commentBody}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
        {/* </div> */}
      </form>
      <Home postId={postId} />
    </article>
  );
}

export default PostDetail;
