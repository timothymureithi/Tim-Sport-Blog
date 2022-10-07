import React from 'react'
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, BrowserRouter, Route} from "react-router-dom";
import Home from './pages/Home';
import AddBlogPost from './pages/AddBlogPost';
import Blog from "./pages/Blog";
import About from "./pages/About";
import PageError from "./pages/PageError";
import Header from "./components/Header";
import userHome from './pages/userHome';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <div> 
      <Header />
      <ToastContainer />
      </div>
      
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userhome" element={<userHome/>}/>
      <Route path="*" element={<PageError />} />
      <Route path="/addBlog" element={<AddBlogPost />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/editBlog/:id" element={<AddBlogPost />} />
      <Route path="/about" element={<About />} />

    </Routes>
    </div>
    </BrowserRouter>
   
  );
   
}

export default App;
