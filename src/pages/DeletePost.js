import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeletePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const onMoveBack = () => {
    navigate(`/post-detail/${postId}`);
  };
  const onDeletePost = () => {
    // postId, password
    axios
      .delete(`http://localhost:3001/posts/${postId}`, {
        data: {
          newPassword: password,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert("비밀번호가 틀립니다.");
        } else {
          navigate('/');
        }
      });
  };
  return (
    <div>
      비밀번호를 입력하세요
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={onMoveBack}>취소</button>
      <button onClick={onDeletePost}>확인</button>
    </div>
  );
}

export default DeletePost;
