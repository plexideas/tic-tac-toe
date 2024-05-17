"use client";
import React, { useState, useEffect, useCallback, FC, useMemo } from "react";
import { Board } from "./components/board";
import { getBestMove, getRandomMove } from "./helpers/bot";
import { CellState, GameMode, PlayerType, ResultType } from "./models";
import { Button } from "@/components/ui/button";
import { getGameStatusIcon } from "./helpers/get-game-status-icon";
import { getWinnerName } from "./helpers/get-winner-name";
import { getNextPlayerName } from "./helpers/get-next-player-name";
import { INITIAL_SCORE, WINNER_LINES } from "./configs";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, RefreshCcw, RotateCcw, Undo2 } from "lucide-react";

interface GameProps {
  mode: GameMode;
}

export const Game: FC<GameProps> = ({ mode }) => {
  const router = useRouter();
  const [isHardMode, setIsHardMode] = useState(false);
  const [scrore, setScore] = useState(INITIAL_SCORE);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<ResultType | null>(null);
  const [winnerCells, setWinnerCells] = useState<number[]>([]);

  const round = useMemo(
    () => Object.values(scrore).reduce((a, b) => a + b, 0),
    [scrore]
  );

  const checkWinner = useCallback((cells: CellState[]) => {
    for (let i = 0; i < WINNER_LINES.length; i++) {
      const [a, b, c] = WINNER_LINES[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a] as ResultType);
        setWinnerCells(WINNER_LINES[i]);
        return;
      }
    }
    if (!cells.includes("")) {
      setWinner(ResultType.Draw);
    }
  }, []);

  const onCellClick = useCallback(
    (i: number) => {
      if (winner || cells[i]) return;
      const newCells = cells.slice();

      if (mode === GameMode.Single || isXNext) {
        newCells[i] = PlayerType.X;
        setCells(newCells);
        setIsXNext(false);
        checkWinner(newCells);
        return;
      }

      newCells[i] = PlayerType.O;
      setCells(newCells);
      setIsXNext(true);
      checkWinner(newCells);
    },
    [winner, cells, mode, isXNext, checkWinner]
  );

  const onResetGame = useCallback(() => {
    setCells(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
    setWinnerCells([]);
  }, []);

  const onResetScore = useCallback(() => {
    onResetGame();
    setScore(INITIAL_SCORE);
  }, [onResetGame]);

  const onBackClick = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!isXNext && !winner && mode === GameMode.Single) {
      const bestMove = isHardMode ? getBestMove(cells) : getRandomMove(cells);
      const newCells = cells.slice();
      newCells[bestMove] = PlayerType.O;
      setCells(newCells);
      setIsXNext(true);
      checkWinner(newCells);
    }
  }, [isXNext, winner, cells, checkWinner, mode, isHardMode]);

  useEffect(() => {
    if (!winner) return;

    setScore((prev) => ({
      ...prev,
      [ResultType[winner]]: prev[ResultType[winner]] + 1,
    }));
  }, [winner]);

  return (
    <div className="h-full w-full flex flex-col gap-4 justify-between md:justify-center items-center overflow-hidden  md:w-auto p-2 md:px-0">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div className="flex">
          <span className="text-2xl md:text-6xl flex items-center md:items-end gap-0 md:gap-2">
            {getGameStatusIcon(winner)}
            <span className="font-black">
              {winner
                ? getWinnerName(winner, mode)
                : getNextPlayerName(isXNext, mode)}
            </span>
          </span>
          <span className="text-xs md:text-base font-thin ml-4">
            {mode === GameMode.Single ? "VS Computer" : "VS Player"}
          </span>
        </div>
        {mode === GameMode.Single && (
          <Checkbox onCheck={setIsHardMode} label="Hard mode" />
        )}
      </div>
      <div className="w-full flex justify-between text-white bg-sky-500 dark:bg-violet-500 px-1 py-1 mb-2 md:mb-6 mt-2">
        <span className="text-md font-thin">
          Round:
          <span className="font-bold">{` ${round}`}</span>
        </span>
        <span className="text-md font-thin">
          {getWinnerName(ResultType.X, mode)}:
          <span className="font-bold">{` ${scrore[ResultType.X]}`}</span>
        </span>
        <span className="text-md font-thin">
          {getWinnerName(ResultType.O, mode)}
          <span className="font-bold">{` ${scrore[ResultType.O]}`}</span>
        </span>
        <span className="text-md font-thin">
          {getWinnerName(ResultType.Draw, mode)}:
          <span className="font-bold">{` ${scrore[ResultType.Draw]}`}</span>
        </span>
      </div>
      <div className="w-full">
        <Board
          cells={cells}
          winnerCells={winnerCells}
          onClick={onCellClick}
          isFinished={Boolean(winner)}
        />
      </div>
      <div className="w-full flex flex-row gap-4 justify-between pt-2 md:pt-12">
        {winner && (
          <Button
            className="basis-full flex-col text-xs md:text-xl md:flex-row"
            onClick={onResetGame}
          >
            <Play />
            <span>New Round</span>
          </Button>
        )}
        {!winner && (
          <Button
            className="basis-full flex-col text-xs md:text-xl md:flex-row"
            onClick={onResetGame}
          >
            <RotateCcw />
            <span>Reset game</span>
          </Button>
        )}
        <Button
          className="basis-full flex-col text-xs md:text-xl md:flex-row"
          onClick={onResetScore}
          disabled={round === 0}
        >
          <RefreshCcw />
          <span>Reset score</span>
        </Button>
        <Button
          className="basis-full flex-col text-xs md:text-xl md:flex-row"
          onClick={onBackClick}
        >
          <Undo2 />
          <span>Back</span>
        </Button>
      </div>
    </div>
  );
};
