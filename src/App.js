import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// * : 컴포넌트
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import DeletePost from "./pages/DeletePost";
// * : etc..
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* 
        // * : 상단 부분  
        */}
        <header className="header_container">
          <h1 className="logo">Logo</h1>
        </header>
        <nav className="header_menu">
          <Link className="menu" to="/">
            갤러리
          </Link>
          <Link className="menu" to="/">
            마이너 갤러리
          </Link>
          <Link className="menu" to="/">
            뉴스
          </Link>
          <Link className="menu-right" to="/">
            걍 넣어본 것
          </Link>
        </nav>
        {/* 
        // * : 본문 
        */}
        <section className="body_container">
          <h1 className="gallery_title">상주 갤러리</h1>
          <hr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/post-detail/:postId" element={<PostDetail />} />
            <Route path="/delete-post/:postId" element={<DeletePost />} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
