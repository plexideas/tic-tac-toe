import { Handshake, Trophy, UserRound } from "lucide-react";
import { ResultType } from "../models";

export const getGameStatusIcon = (winner: string | null) => {
  switch (winner) {
    case ResultType.Draw:
      return <Handshake className="size-6 md:size-16" />;
    case ResultType.X:
    case ResultType.O:
      return <Trophy className="size-6 md:size-16" />;
    default:
      return <UserRound className="size-6 md:size-16" />;
  }
};
