import { useEffect, useState } from "react";
import { Game } from "@/types/game.interface";
import { useStorage } from "@/hooks/useStorage";
import { StorageID } from "@/types/storage.enum";

const useGamesHistory = () => {
  const { getFromLocalStorage, setInLocalStorage, removeFromLocalStorage } =
    useStorage();

  const [gamesHistory, setGamesHistory] = useState<Game[]>([]);

  useEffect(() => {
    const history = getFromLocalStorage<Game[]>(StorageID.GAME_HISTORY);
    if (history && typeof history !== "string") setGamesHistory(history);
  }, [getFromLocalStorage]);

  useEffect(() => {
    setInLocalStorage(StorageID.GAME_HISTORY, gamesHistory);
  }, [gamesHistory, setInLocalStorage]);

  const saveGame = (game: Game) => {
    setGamesHistory((prev) => [...prev, game]);
  };

  const clearHistory = () => {
    setGamesHistory([]);
    removeFromLocalStorage([StorageID.GAME_HISTORY]);
  };

  return { gamesHistory, saveGame, clearHistory };
};

export default useGamesHistory;
