import React from "react";
import Footer from "@/components/Footer";
import AppMenu from "@/components/AppMenu";
import { RoutesEnum } from "@/Router";
import { Location, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location: Location<RoutesEnum> = useLocation();

  return (
    <div style={{ overflow: "hidden", height: "100dvh" }}>
      <AppMenu currenPage={location} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
