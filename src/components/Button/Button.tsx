import React from "react";
import Loader from "@/components/Loader";
import style from "./Button.module.scss";
import useStyles from "@/hooks/useStyles";
import { ButtonProps, ButtonRolesEnum } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  iconButton = false,
  variant = "solid",
  color = "gold",
  onClick,
  href,
  target,
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
    style[color],
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
    if (iconButton)
      return (
        <span className={style.content} role={ButtonRolesEnum.ICON}>
          {children}
        </span>
      );
    return (
      <span className={style.content}>
        {startIcon && (
          <span role={ButtonRolesEnum.START_ICON}>{startIcon}</span>
        )}
        {children}
        {endIcon && <span role={ButtonRolesEnum.END_ICON}>{endIcon}</span>}
      </span>
    );
  };

  if (href)
    return (
      <a
        className={classes}
        href={href}
        target={target}
        role={ButtonRolesEnum.LINK}
      >
        {content()}
      </a>
    );

  const canClick = () => !disabled && !loading;
  const onUserClick = () => canClick() && onClick && onClick();

  return (
    <button
      onClick={onUserClick}
      className={classes}
      disabled={disabled}
      role={ButtonRolesEnum.BUTTON}
    >
      {content()}
    </button>
  );
};

export default Button;
