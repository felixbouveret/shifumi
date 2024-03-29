import React from "react";
import Popin from "../Popin";
import Button from "../Button";
import style from "./PartyEndPopin.module.scss";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import { PlayerType } from "@/types/game.enum";
import { useNavigate } from "react-router-dom";

interface PartyEndPopinProps {
  visible: boolean;
  player: PlayerType;
  onClosed: () => void;
}

const confettiConfig: ConfettiProps = {
  force: 1,
  duration: 10000,
  particleCount: 250,
  width: 1600,
};
const PartyEndPopin: React.FC<PartyEndPopinProps> = ({
  visible,
  player,
  onClosed,
}) => {
  const navigate = useNavigate();

  const winner = player === PlayerType.LOCAL_USER ? "Victory!" : "Defeat...";

  return (
    <Popin className={style.partyEndPopin} visible={visible}>
      {player === PlayerType.LOCAL_USER && (
        <div className={style.confetti}>
          <ConfettiExplosion {...confettiConfig} />
        </div>
      )}

      <h2>{winner}</h2>
      <div className={style.buttons}>
        <Button onClick={() => navigate("/")} variant="clear">
          Back to home
        </Button>
        <Button onClick={() => onClosed()}>Play again</Button>
      </div>
    </Popin>
  );
};

export default PartyEndPopin;
