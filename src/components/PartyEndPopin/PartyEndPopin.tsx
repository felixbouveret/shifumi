import "./PartyEndPopin.scss";
import React from "react";
import Popin from "../Popin";
import { Button } from "@mui/joy";
import { PlayerType } from "@/types/game.enum";
import { useNavigate } from "react-router-dom";

interface PartyEndPopinProps {
  visible: boolean;
  player: PlayerType;
  onClosed: () => void;
}

const PartyEndPopin: React.FC<PartyEndPopinProps> = ({
  visible,
  player,
  onClosed,
}) => {
  const navigate = useNavigate();

  const winner =
    player === PlayerType.LOCAL_USER
      ? "You won the game!"
      : "Your opponent won the game!";

  return (
    <Popin className="partyEndPopin" visible={visible}>
      <h2>{winner}</h2>
      <div className="buttons">
        <Button onClick={() => navigate("/")}>Back to home</Button>
        <Button onClick={() => onClosed()}>Play again</Button>
      </div>
    </Popin>
  );
};

export default PartyEndPopin;
