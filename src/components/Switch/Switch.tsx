import React from "react";
import Loader from "../Loader";
import style from "./Switch.module.scss";
import useStyles from "@/hooks/useStyles";

interface SwitchProps {
  className?: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  className,
  checked,
  label,
  onChange,
  disabled,
  loading,
}) => {
  const { s } = useStyles();

  const classes = s([
    className,
    style.switchContainer,
    {
      [style.disabled]: disabled,
      [style.loading]: loading,
    },
  ]);

  const randomId = Math.random().toString(36).substring(7);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return null;
    onChange(e);
  };

  return (
    <div className={classes}>
      <input
        className={style.input}
        checked={checked}
        onChange={onValueChange}
        type="checkbox"
        id={randomId}
        disabled={disabled}
      />
      <label className={style.label} htmlFor={randomId}>
        <div className={style.slider}>
          {loading && (
            <Loader
              small
              className={style.loader}
              color={checked ? "gold" : "silver"}
            />
          )}
        </div>
        {label}
      </label>
    </div>
  );
};

export default Switch;
