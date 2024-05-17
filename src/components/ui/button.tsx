import { cn } from "@/libs/utils";
import { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    disabled={props.disabled}
    className={cn(
      "flex items-center justify-center gap-2 font-thin lg:text-xl px-4 py-2 hover:bg-neutral-900 hover:text-neutral-100 hover:dark:bg-neutral-100 hover:dark:text-neutral-900 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500 disabled:dark:bg-neutral-700 disabled:dark:text-neutral-300 focus:outline-none transition-colors duration-200 ease-in-out",
      props.className
    )}
  >
    {props.children}
  </button>
);
