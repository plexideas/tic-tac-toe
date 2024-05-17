import { GameMode, Players } from "../models";

export const getNextPlayerName = (isXNext: boolean, mode: GameMode) => {
  if (mode === GameMode.Single) {
    return Players.Player1;
  }

  return isXNext ? Players.Player1 : Players.Player2;
};
