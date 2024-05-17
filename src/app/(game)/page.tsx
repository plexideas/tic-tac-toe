import { Gamepad, UserRound, UsersRound } from "lucide-react";
import Link from "next/link";

export default function GamePage() {
  return (
    <section>
      <h1 className="lg:text-5xl font-thin pb-6 flex gap-1 lg:gap-4 w-full">
        TicTac<span className="font-bold">Toe</span>{" "}
        <Gamepad className="lg:size-12 rotate-45 text-sky-500 dark:text-violet-500" />
      </h1>
      <div className="flex flex-col gap-4">
        <Link
          className="w-full text-4xl lg:h-24 lg:w-[600px] lg:text-7xl font-thin group hover:font-semibold flex gap-2 items-cente transition-all duration-200 ease-in-outr"
          href="/one-player"
        >
          <UserRound className="lg:size-24 opacity-75 group-hover:opacity-100" />{" "}
          ONE PLAYER
        </Link>
        <Link
          className="w-full text-4xl lg:h-24 lg:w-[600px] lg:text-7xl font-thin group hover:font-semibold flex gap-2 items-center transition-all duration-200 ease-in-out"
          href="/two-player"
        >
          <UsersRound className="lg:size-24 opacity-75 group-hover:opacity-100" />
          TWO PLAYER
        </Link>
      </div>
    </section>
  );
}
