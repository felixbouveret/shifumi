import React from "react";
import AppMenu from "@/components/AppMenu";
import { RoutesEnum } from "@/Router";
import { Location, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location: Location<RoutesEnum> = useLocation();

  return (
    <div className="MainLayout">
      <AppMenu currenPage={location} />
      <Outlet />
    </div>
  );
};

export default MainLayout;