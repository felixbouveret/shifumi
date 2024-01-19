import React from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import useStyles from "@/hooks/useStyles";
import style from "./HomeModule.module.scss";
import WellSwitch from "./components/WellSwitch";
import usePlayerHand from "@/hooks/usePlayerHand";
import GamesHistory from "./components/GamesHistory";
import { Button } from "@mui/joy";
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

  const buttonStyle = {
    backgroundColor: "#ffd700",
    color: "rgb(189 164 29)",
    fontWeight: "bold",
    borderRadius: "12px",
    border: "solid 3px rgb(189 164 29)",
    boxShadow: "0 0 0 3px #ffd700, 0 0 20px 0px rgba(0,0,0, 0.2)",
  };
  return (
    <div className={style.homeContainer}>
      <div className={s([style.cardsSlider, style.top])}>{cardsList}</div>
      <div className={style.content}>
        <h1>Shifumi</h1>
        <Button
          className={style.button}
          size="lg"
          style={buttonStyle}
          onClick={() => navigate("/Game")}
        >
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
