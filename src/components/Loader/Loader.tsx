import React from "react";
import style from "./Loader.module.scss";
import useStyles from "@/hooks/useStyles";

interface LoaderProps {
  className?: string;
  color?: "gold" | "silver";
  small?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  className,
  color = "gold",
  small,
}) => {
  const { s } = useStyles();

  return (
    <div
      role="loader"
      className={s([
        className,
        style.loaderContainer,
        style[color],
        { [style.small]: small },
      ])}
    >
      <span className={style.dot} />
      <span className={style.dot} />
      <span className={style.dot} />
    </div>
  );
};

export default Loader;
