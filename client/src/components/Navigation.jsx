import React from "react";
import {
  Routes,
  Route,
  HashRouter as Router,
} from "react-router-dom";
import { HomePage } from "../pages/index";
import {Navbar} from "./index";


const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/item" element={<HomePage />} />
        <Route exact path="/item" element={<HomePage />} />
        <Route exact path="/item" element={<HomePage />} />
      </Routes>
    </Router>
  );
};


export default Navigation;
