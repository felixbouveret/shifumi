import React from "react";
import style from "./Switch.module.scss";
import useStyles from "@/hooks/useStyles";

interface SwitchProps {
  className?: string;
  checked: boolean;
  label: string;
  variant?: "solid" | "clear";
  color?: "gold" | "silver" | "white" | "green";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  className,
  checked,
  label,
  variant = "solid",
  color = "gold",
  onChange,
  disabled,
  loading,
}) => {
  const { s } = useStyles();

  const classes = s([
    className,
    style.switchContainer,
    style[variant],
    style[color],
    {
      [style.disabled]: disabled,
      [style.loading]: loading,
    },
  ]);

  const randomId = Math.random().toString(36).substring(7);

  return (
    <div className={classes}>
      <input
        className={style.input}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        id={randomId}
        disabled={disabled}
      />
      <label className={style.label} htmlFor={randomId}>
        <div className={style.slider}></div>
        {label}
      </label>
    </div>
  );
};

export default Switch;
