export interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  activeColor?: string;
  inactiveColor?: string;
}