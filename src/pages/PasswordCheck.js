// * : librarys
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PasswordCheck() {
  // * : utilities
  const { updateOrDelete,postId } = useParams();
  const navigate = useNavigate();
  // * : states
  const [password, setPassword] = useState();
  // * : functions
  // go back to its post page
  const onMoveBack = () => {
    navigate(`/post-detail/${postId}`);
  };
  // delete post
  const onDeletePost = async () => {
    await axios
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
  const onUpdatePost = ()=>{navigate(`/update-post/${postId}`)}
  
  let onClick;

  if(updateOrDelete === "delete"){
    onClick = onDeletePost;
  }else{
    onClick = onUpdatePost;
  }
  
  return (
    <div>
      비밀번호를 입력하세요
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={onMoveBack}>취소</button>
      <button onClick={onClick}>확인</button>
    </div>
  );
}

export default PasswordCheck;
