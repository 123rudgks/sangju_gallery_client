import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const onNewPost = () => {
    navigate("/new-post");
  };
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPostList(response.data);
    });
  }, []);
  return (
    <article>
      <div className="home_menu_container">
        <button>전체글</button>
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
            {postList.map((post,index) => {
              return (
                <tr key={index}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.username}</td>
                  <td>{post.createdAt}</td>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="home_menu_container">
          <button>전체글</button>
          <button>개념글</button>
          <button onClick={onNewPost}>글쓰기</button>
        </div>
      </div>
    </article>
  );
}

export default Home;
