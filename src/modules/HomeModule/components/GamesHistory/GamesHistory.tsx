import "./GamesHistory.scss";
import React from "react";
import useGameUtils from "@/hooks/useGameUtils";
import useGamesHistory from "@/hooks/useGamesHistory";

const GamesHistory: React.FC = () => {
  const { gamesHistory } = useGamesHistory();
  const { getIconFromEnum } = useGameUtils();

  if (gamesHistory.length === 0) return;
  return (
    <div className="gamesHistory">
      <div className="heading">
        <h2>Games history</h2>
        <div className="labels">
          <div>Winner</div>
          <div>W L D</div>
        </div>
      </div>
      <div className="gamesList">
        {gamesHistory.map((game, index) => (
          <div className="game" key={index}>
            <div>{getIconFromEnum(game.winner)}</div>
            <div>
              {game.localUser.score} {game.opponent.score} {game.drawsCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesHistory;
