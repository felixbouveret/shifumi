import "./GamesHistory.scss";
import React from "react";
import useGamesHistory from "@/hooks/useGamesHistory";

const GamesHistory: React.FC = () => {
  const { gamesHistory } = useGamesHistory();

  if (gamesHistory.length === 0) return;
  return (
    <div className="gamesHistory">
      <div className="inner">
        <div className="game heading">
          <div>Winner</div>
          <div>Rounds</div>
        </div>
        {gamesHistory.map((game, index) => (
          <div className="game" key={index}>
            <div>{game.winner}</div>
            <div>{game.round} rounds</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesHistory;
