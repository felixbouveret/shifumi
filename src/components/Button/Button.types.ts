export enum ButtonRolesEnum {
  BUTTON = "button",
  LINK = "link",
  ICON = "icon",
  START_ICON = "startIcon",
  END_ICON = "endIcon",
}

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  iconButton?: boolean;
  variant?: "solid" | "clear";
  color?: "gold" | "silver" | "white" | "green";
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
