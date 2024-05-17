import { GameMode, Players, ResultType } from "../models";

export const getWinnerName = (
  resultType: ResultType | null,
  mode: GameMode
) => {
  if (resultType === ResultType.Draw) {
    return ResultType.Draw;
  }

  if (resultType === ResultType.X) {
    return Players.Player1;
  }

  if (resultType === ResultType.O) {
    return mode === GameMode.Single ? Players.Computer : Players.Player2;
  }
};
