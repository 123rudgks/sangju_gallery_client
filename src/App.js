import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
// * : 컴포넌트
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import DeletePost from "./pages/DeletePost";
import UpdatePost from "./pages/UpdatePost";
import PasswordCheck from "./pages/PasswordCheck";
import ManagerLogin from "./pages/ManagerLogin";
import ManagerRegister from "./pages/ManagerRegister";
// * : etc..
import "./App.css";
import { Update } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";



function App() {
  const navigate = useNavigate();
  const moveHome = ()=>{
    navigate('/')
  }
  
  return (
    <div className="App">
        {/*
        // * : 상단 부분
        */}
        <header className="header_container">
          <h1 className="logo">Logo</h1>
        </header>
        <AppBar position="static" sx={{ bgcolor: "#219f94" }}>
          <Toolbar>
            <Button sx={{ my: 2, color: "white", display: "block" }} onClick={moveHome}>
              갤러리
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              마이너 갤러리
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              뉴스
            </Button>
          </Toolbar>
        </AppBar>

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
            <Route path="/update-post/:postId" element={<UpdatePost />} />
            <Route
              path="/password-check/:updateOrDelete/:postId"
              element={<PasswordCheck />}
            />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/manager-register" element={<ManagerRegister />} />
          </Routes>
        </section>
    </div>
  );
}

export default App;
