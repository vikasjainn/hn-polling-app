import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PostDetails from './PostDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
