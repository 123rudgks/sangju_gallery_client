import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const onNewPost = () => {
    navigate("/new-post");
  };
  useEffect(()=>{
    axios.get("")
  },[])
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
            <tr>
              <td>1</td>
              <td>첫번째 글</td>
              <td>상주네임드</td>
              <td>2022.02.17</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2</td>
              <td>두번째 글</td>
              <td>상주네임드</td>
              <td>2022.02.17</td>
              <td>2</td>
            </tr>
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
