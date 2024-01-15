import { useStorage } from "./useStorage";
import { useEffect, useState } from "react";
import { Game } from "@/types/game.interface";

const useGamesHistory = () => {
  const { getFromLocalStorage, setInLocalStorage } = useStorage();

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

  return { gamesHistory, saveGame };
};

export default useGamesHistory;
