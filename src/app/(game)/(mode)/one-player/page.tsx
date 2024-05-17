import { Game } from "@/features/game";
import { GameMode } from "@/features/game/models";

export default function OnePlayerPage() {
  return <Game mode={GameMode.Single} />;
}
