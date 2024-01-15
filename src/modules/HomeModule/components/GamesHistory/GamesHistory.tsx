import "./GamesHistory.scss";
import React from "react";
import useGameUtils from "@/hooks/useGameUtils";
import useGamesHistory from "@/hooks/useGamesHistory";
import CarpetContainer from "@/components/CarpetContainer";
import { Button } from "@mui/joy";
import { Game } from "@/types/game.interface";

const GamesHistory: React.FC = () => {
  const { gamesHistory, clearHistory } = useGamesHistory();
  const { getIconFromEnum } = useGameUtils();

  const getDrawsCount = (game: Game) => {
    const { localUser, opponent } = game;
    const totalPoints = localUser.score + opponent.score;
    const drawsCount = game.rounds + 1 - totalPoints;
    return drawsCount;
  };

  if (gamesHistory.length === 0) return;
  return (
    <CarpetContainer className="gamesHistory" goldFrame>
      <div className="heading">
        <h2>Games history</h2>
        <div className="labels">
          <div>Winner</div>
          <div className="scores">
            <span>W</span>
            <span>L</span>
            <span>D</span>
          </div>
        </div>
      </div>
      <div className="gamesList">
        {gamesHistory.map((game, index) => (
          <div className="game" key={index}>
            <div>{getIconFromEnum(game.winner)}</div>
            <div className="scores">
              <span>{game.localUser.score}</span>
              <span>{game.opponent.score}</span>
              <span>{getDrawsCount(game)}</span>
            </div>
          </div>
        ))}
        <Button
          className="button"
          size="sm"
          variant="plain"
          color="neutral"
          onClick={clearHistory}
          style={{ color: "#113b11" }}
        >
          Clear history
        </Button>
      </div>
    </CarpetContainer>
  );
};

export default GamesHistory;
