import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* 
        // * : header 부분  
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
        </nav>

        <section>
          <h1 className="gallery_title">상주 갤러리</h1>
          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<NewPost />} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
