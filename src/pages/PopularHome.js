// * : library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// * : MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function PopularHome({ postId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
  const onMovePasswordCheck = async (updateOrDelete, postId) => {
    navigate(`/password-check/${updateOrDelete}/${postId}`);
  };
  // go to home page
  const onMoveHome = () => {
    navigate("/");
  };
  const columns = [
    { id: "id", label: "id", align: "center", minWidth: 170 },
    { id: "title", label: "제목", minWidth: 100 },
    {
      id: "username",
      label: "작성자",
      minWidth: 170,
      align: "center",
    },
    {
      id: "createdAt",
      label: "작성일",
      minWidth: 170,
      align: "center",
    },
    {
      id: "Likes",
      label: "추천",
      minWidth: 170,
      align: "center",
    },
  ];

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
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {postList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={post.id}
                      onClick={() => onMovePost(post.id)}
                    >
                      {columns.map((column) => {
                        const value = post[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "Likes" ? value.length : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10]}
          component="div"
          count={postList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

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
                onMovePasswordCheck("delete", postId);
              }}
            >
              삭제
            </button>
            <button
              className="float-right"
              onClick={() => {
                onMovePasswordCheck("update", postId);
              }}
            >
              수정
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default PopularHome;
