import { ToggleSwitchProps } from "../../types";

export function ToggleSwitch({
  isActive,
  onToggle,
  activeColor = "bg-secondary",
  inactiveColor = "bg-tertiary",
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isActive}
      className="relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out bg-primary"
    >
      <span
        className={`absolute w-5 h-5 rounded-full top-0.5 left-1 transition-transform duration-200 ease-in-out ${
          isActive ? "translate-x-7" : "translate-x-0"
        } ${isActive ? activeColor : inactiveColor}`}
      />
    </button>
  );
}