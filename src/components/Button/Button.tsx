import React from "react";
import Loader from "@/components/Loader";
import style from "./Button.module.scss";
import useStyles from "@/hooks/useStyles";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  iconButton?: boolean;
  variant?: "gold" | "silver" | "clear";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  iconButton = false,
  variant = "gold",
  onClick,
  href,
  disabled,
  loading,
  startIcon,
  endIcon,
}) => {
  const { s } = useStyles();

  const classes = s([
    className,
    style.buttonContainer,
    style[variant],
    {
      [style.disabled]: disabled,
      [style.loading]: loading,
      [style.iconButton]: iconButton,
    },
  ]);

  const content = () => {
    if (loading)
      return (
        <span className={style.content}>
          <Loader color={disabled ? "silver" : "gold"} />
        </span>
      );
    if (iconButton) return <span className={style.content}>{children}</span>;
    return (
      <span className={style.content}>
        {startIcon}
        {children}
        {endIcon}
      </span>
    );
  };

  if (href)
    return (
      <a className={classes} href={href}>
        {content()}
      </a>
    );

  const canClick = () => !disabled && !loading;
  const onUserClick = () => canClick() && onClick && onClick();

  return (
    <button onClick={onUserClick} className={classes} disabled={disabled}>
      {content()}
    </button>
  );
};

export default Button;
