import React from "react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import style from "./GamesHistory.module.scss";
import useGamesHistory from "@/hooks/useGamesHistory";
import CarpetContainer from "@/components/CarpetContainer";
import { Game } from "@/types/game.interface";

const GamesHistory: React.FC = () => {
  const { gamesHistory, clearHistory } = useGamesHistory();

  const getDrawsCount = (game: Game) => {
    const { localUser, opponent } = game;
    const totalPoints = localUser.score + opponent.score;
    const drawsCount = game.rounds + 1 - totalPoints;
    return drawsCount;
  };

  if (gamesHistory.length === 0) return;
  return (
    <CarpetContainer className={style.gamesHistory} goldFrame>
      <div className={style.heading}>
        <h2>Games history</h2>
        <div className={style.labels}>
          <div>Winner</div>
          <div className={style.scores}>
            <span>W</span>
            <span>L</span>
            <span>D</span>
          </div>
        </div>
      </div>
      <div className={style.gamesList}>
        {gamesHistory.map((game, index) => (
          <div className={style.game} key={index}>
            <Icon name={game.winner} size={16} />
            <div className={style.scores}>
              <span>{game.localUser.score}</span>
              <span>{game.opponent.score}</span>
              <span>{getDrawsCount(game)}</span>
            </div>
          </div>
        ))}
        <Button
          className={style.button}
          variant="clear"
          color="green"
          onClick={clearHistory}
        >
          Clear history
        </Button>
      </div>
    </CarpetContainer>
  );
};

export default GamesHistory;
