import "./HomeModule.scss";
import React from "react";
import GamesHistory from "./components/GamesHistory";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <h1>Shifumi</h1>
      <Button className="button" size="lg" onClick={() => navigate("/Game")}>
        Play now
      </Button>

      <GamesHistory />
    </div>
  );
};

export default HomeModule;
