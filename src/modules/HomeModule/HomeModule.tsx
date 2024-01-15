import "./HomeModule.scss";
import React from "react";
import Card from "../BoardModule/components/Card";
import usePlayerHand from "@/hooks/usePlayerHand";
import GamesHistory from "./components/GamesHistory";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();
  const { getRandomPlayableCard } = usePlayerHand();

  const cardsList = (
    <div className="cardsInner">
      {[...Array(20)].map((_, i) => (
        <Card key={i} type={getRandomPlayableCard()} isFlipped flipOnHover />
      ))}
    </div>
  );

  return (
    <div className="homeContainer">
      <div className="cardsSlider top">{cardsList}</div>
      <div className="content">
        <h1>Shifumi</h1>
        <Button className="button" size="lg" onClick={() => navigate("/Game")}>
          Play now
        </Button>

        <GamesHistory />
      </div>
      <div className="cardsSlider bot">{cardsList}</div>
    </div>
  );
};

export default HomeModule;
