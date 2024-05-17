import { memo, useCallback } from "react";
import { Cell } from "./cell";
import { CellState, CellVariant } from "../models";
import { cn } from "@/libs/utils";

interface BoardProps {
  cells: CellState[];
  winnerCells: number[];
  isFinished: boolean;
  onClick: (i: number) => void;
}

export const Board = memo<BoardProps>(
  ({ cells, onClick, winnerCells, isFinished }) => {
    const renderCell = useCallback(
      (i: number) => {
        if (isFinished) {
          return (
            <Cell
              variant={
                winnerCells.includes(i) ? CellVariant.Winner : CellVariant.Draw
              }
              value={cells[i]}
              onClick={() => onClick(i)}
            />
          );
        }
        return <Cell value={cells[i]} onClick={() => onClick(i)} />;
      },
      [cells, isFinished, onClick, winnerCells]
    );

    return (
      <div
        className={cn(
          "h-full w-full aspect-square grid grid-rows-3 md:flex md:flex-col",
          isFinished && "pointer-events-none"
        )}
      >
        <div className="box-border md:flex border-b-4 md:border-b-8 border-current grid grid-cols-3">
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(0)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(1)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 border-transparent">
            {renderCell(2)}
          </div>
        </div>
        <div className="box-border md:flex border-b-4 md:border-b-8 border-current grid grid-cols-3">
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(3)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(4)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 border-transparent">
            {renderCell(5)}
          </div>
        </div>
        <div className="box-border md:flex grid grid-cols-3">
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(6)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 md:border-r-8 border-current">
            {renderCell(7)}
          </div>
          <div className="box-decoration-slice w-full h-full border-r-4 border-transparent">
            {renderCell(8)}
          </div>
        </div>
      </div>
    );
  }
);

Board.displayName = "Board";
