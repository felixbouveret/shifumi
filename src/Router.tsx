import React from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { Routes, Route } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default AppRouter;
