import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/Home/Home";
import About from "./components/About/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
