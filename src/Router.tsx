import React from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import { RoutesEnum } from "./types/routes.enum";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={RoutesEnum.HOME} element={<Home />} />
        <Route path={RoutesEnum.GAME} element={<Game />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
