// * : library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home({ postId }) {
  // * : states
  const [postList, setPostList] = useState([]);
  // * : functions
  const navigate = useNavigate();
  // move to writing post page
  const onNewPost = () => {
    navigate("/new-post");
  };
  // move to post detail page
  const onMovePost = (postId) => {
    // Todo: replace는 뭐지?
    navigate(`/post-detail/${postId}`, { replace: true });
  };
  // go to password page for deleting post
  const onMoveDelete = async (postId) => {
    navigate(`/delete-post/${postId}`);
  };
  // go to home page
  const onMoveHome = () => {
    navigate("/");
  };
  useEffect(async () => {
    await axios.get("http://localhost:3001/posts").then((response) => {
      setPostList(response.data);
    });
  }, []);
  return (
    <article>
      <div className="home_menu_container">
        <button onClick={onMoveHome}>전체글</button>
        <button>개념글</button>
        <button>공지</button>
      </div>


      <div className="lists_container">
        <table>
          <colgroup>
            <col id="col_number" />
            <col id="col_title" />
            <col className="col" />
            <col className="col" />
            <col className="col" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">작성일</th>
              <th scope="col">추천</th>
            </tr>
          </thead>

          <tbody>
            {postList.map((post, index) => {
              return (
                <tr
                  className="home-post"
                  key={index}
                  onClick={() => onMovePost(post.id)}
                >
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.username}</td>
                  <td>{post.createdAt}</td>
                  <td>{post.Likes.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>


        <div className="float-clear home_menu_container">
          <button onClick={onMoveHome}>전체글</button>
          <button>개념글</button>
          <button className="float-right" onClick={onNewPost}>
            글쓰기
          </button>
          {postId && (
            <>
              <button
                className="float-right"
                onClick={() => {
                  onMoveDelete(postId);
                }}
              >
                삭제
              </button>
              <button className="float-right">수정</button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default Home;
