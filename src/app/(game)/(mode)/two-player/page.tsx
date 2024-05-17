import { Game } from "@/features/game";
import { GameMode } from "@/features/game/models";

export default function TwoPlayerPage() {
  return <Game mode={GameMode.Multi} />;
}
