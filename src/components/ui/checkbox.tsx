import { Square, SquareCheck } from "lucide-react";
import { FC, HTMLAttributes, useCallback, useState } from "react";

interface CheckboxProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  onCheck: (isChecked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  label,
  onCheck,
  ...attr
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCheckboxClick = useCallback(() => {
    onCheck(!isChecked);
    setIsChecked(!isChecked);
  }, [isChecked, onCheck]);

  return (
    <button
      {...attr}
      className="group font-thin hover:text-sky-500 hover:dark:text-violet-500 flex gap-2"
      onClick={onCheckboxClick}
    >
      <span>{label}</span>
      {isChecked ? (
        <SquareCheck className="w-6 h-6 " />
      ) : (
        <Square className="w-6 h-6 " />
      )}
    </button>
  );
};
