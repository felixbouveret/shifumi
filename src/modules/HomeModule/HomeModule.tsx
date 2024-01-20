import React from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import useStyles from "@/hooks/useStyles";
import style from "./HomeModule.module.scss";
import WellSwitch from "./components/WellSwitch";
import usePlayerHand from "@/hooks/usePlayerHand";
import GamesHistory from "./components/GamesHistory";
import { useNavigate } from "react-router-dom";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();
  const { s } = useStyles();
  const { getRandomPlayableCard } = usePlayerHand();

  const cardsList = (
    <div className={style.cardsInner}>
      {[...Array(20)].map((_, i) => (
        <Card key={i} type={getRandomPlayableCard()} isFlipped flipOnHover />
      ))}
    </div>
  );
  return (
    <div className={style.homeContainer}>
      <div className={s([style.cardsSlider, style.top])}>{cardsList}</div>
      <div className={style.content}>
        <h1>Shifumi</h1>
        <Button className={style.button} onClick={() => navigate("/Game")}>
          Play now
        </Button>
        <WellSwitch />

        <GamesHistory />
      </div>
      <div className={s([style.cardsSlider, style.bot])}>{cardsList}</div>
      <Footer />
    </div>
  );
};

export default HomeModule;
