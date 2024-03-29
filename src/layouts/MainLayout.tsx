import React from "react";
import AppMenu from "@/components/AppMenu";
import { RoutesEnum } from "@/types/routes.enum";
import { Location, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location: Location<RoutesEnum> = useLocation();

  return (
    <div style={{ overflow: "hidden", height: "100dvh" }}>
      <AppMenu currenPage={location} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
