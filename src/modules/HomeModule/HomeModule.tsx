import "./HomeModule.scss";
import React from "react";
import { People } from "@mui/icons-material";
import { Button, IconButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Shifumi</h1>
      <Button className="button" size="lg" onClick={() => navigate("/Game")}>
        Play now
      </Button>

      <div className="iconButtonsContainer">
        <IconButton className="IconButton" size="lg">
          <People />
        </IconButton>
      </div>
    </div>
  );
};

export default HomeModule;
