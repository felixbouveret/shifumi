import { useEffect, useState } from "react";
import { Game } from "@/types/game.interface";
import { useStorage } from "@/hooks/useStorage";

const useGamesHistory = () => {
  const { getFromLocalStorage, setInLocalStorage, removeFromLocalStorage } =
    useStorage();

  const [gamesHistory, setGamesHistory] = useState<Game[]>([]);

  useEffect(() => {
    const history = getFromLocalStorage<Game[]>("gamesHistory");
    if (history && typeof history !== "string") setGamesHistory(history);
  }, []);

  useEffect(() => {
    setInLocalStorage("gamesHistory", gamesHistory);
  }, [gamesHistory]);

  const saveGame = (game: Game) => {
    setGamesHistory((prev) => [...prev, game]);
  };

  const clearHistory = () => {
    setGamesHistory([]);
    removeFromLocalStorage(["gamesHistory"]);
  };

  return { gamesHistory, saveGame, clearHistory };
};

export default useGamesHistory;
