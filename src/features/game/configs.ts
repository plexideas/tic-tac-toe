import { ResultType } from "./models";

export const WINNER_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const INITIAL_SCORE = {
  [ResultType.O]: 0,
  [ResultType.X]: 0,
  [ResultType.Draw]: 0,
};
