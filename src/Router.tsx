import React from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";

export enum RoutesEnum {
  HOME = "/",
  GAME = "/game",
}

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
