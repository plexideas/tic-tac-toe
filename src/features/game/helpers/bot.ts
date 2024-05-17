import { Result, CellState, PlayerType, ResultType } from "../models";

export const minimax = (
  cells: CellState[],
  depth: number,
  isMaximizing: boolean
): number => {
  const scores = { X: -1, O: 1, Draw: 0 };
  const result = checkWinnerMinimax(cells);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") {
        cells[i] = PlayerType.O;
        let score = minimax(cells, depth + 1, false);
        cells[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") {
        cells[i] = PlayerType.X;
        let score = minimax(cells, depth + 1, true);
        cells[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getBestMove = (cells: CellState[]): number => {
  const emptycells = cells
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null) as number[];
  let bestScore = -Infinity;
  let move = -1;

  for (let i of emptycells) {
    cells[i] = PlayerType.O;
    let score = minimax(cells, 0, false);
    cells[i] = "";
    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }

  return move;
};

export const getRandomMove = (squares: CellState[]): number => {
  if (Math.random() >= 0.5) {
    return getBestMove(squares);
  }
  const emptySquares = squares
    .map((square, index) => (square === "" ? index : null))
    .filter((index) => index !== null) as number[];
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

const checkWinnerMinimax = (cells: CellState[]): Result | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a] as Result;
    }
  }
  if (!cells.includes("")) {
    return ResultType.Draw;
  }
  return null;
};
