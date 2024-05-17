export type Result = ResultType.X | ResultType.O | ResultType.Draw | null;

export type CellState = PlayerType.X | PlayerType.O | "";

export enum PlayerType {
  X = "X",
  O = "O",
}

export enum ResultType {
  X = PlayerType.X,
  O = PlayerType.O,
  Draw = "Draw",
}

export enum GameMode {
  Single = "single",
  Multi = "multi",
}

export enum Players {
  Player1 = "Player 1",
  Computer = "Computer",
  Player2 = "Player 2",
}

export enum CellVariant {
  Winner = "winner",
  Normal = "normal",
  Draw = "draw",
}
