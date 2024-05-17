import { FC, memo, useEffect, useRef } from "react";
import { CellState, CellVariant, PlayerType } from "../models";
import { X, Circle } from "lucide-react";
import { cn } from "@/libs/utils";

interface CellProps {
  value: CellState;
  variant?: CellVariant;
  onClick: () => void;
}

const getCellIcon = (value: CellState) => {
  if (value === PlayerType.X) return <X className="w-full h-full" />;
  if (value === PlayerType.O) return <Circle className="w-5/6 h-5/6" />;
  return "";
};

const variantClasses: Record<CellVariant, string> = {
  winner: "bg-sky-300 dark:bg-violet-500",
  normal: "",
  draw: "bg-neutral-100 dark:bg-neutral-900",
};

export const Cell = memo<CellProps>(
  ({ value, variant = CellVariant.Normal, onClick }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // useEffect(() => {
    //   if (buttonRef.current) {
    //     buttonRef.current.addEventListener("touchend", (e) => {
    //       buttonRef.current?.blur();
    //     });
    //   }
    // }, []);

    return (
      <button
        ref={buttonRef}
        className={cn(
          "w-full h-full md:size-36 lg:size-48 flex justify-center items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none",
          variantClasses[variant]
        )}
        onClick={onClick}
      >
        {getCellIcon(value)}
      </button>
    );
  }
);

Cell.displayName = "Cell";
