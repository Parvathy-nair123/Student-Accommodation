import { useState, } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import TagBlog from "./pages/TagBlog";
import CategoryBlog from "./pages/CategoryBlog";
import ScrollToTop from "./components/ScrollToTop";
import Blogs from "./pages/Blogs";

function App() {

  return (
    <div className="BlogApp">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/search"
          element={<Home />}
        />
        <Route
          path="/detail/:id"
          element={<Detail />}
        />
        <Route
          path="/create"
          element={<AddEditBlog />}
        />
        <Route
          path="/update/:id"
          element={
            <AddEditBlog />
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/tag/:tag" element={<TagBlog />} />
        <Route path="/category/:category" element={<CategoryBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
