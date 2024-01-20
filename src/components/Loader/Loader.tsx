import React from "react";
import style from "./Loader.module.scss";
import useStyles from "@/hooks/useStyles";

interface LoaderProps {
  className?: string;
  color?: "gold" | "silver";
}

const Loader: React.FC<LoaderProps> = ({ className, color = "gold" }) => {
  const { s } = useStyles();

  return (
    <div className={s([className, style.loaderContainer, style[color]])}>
      <span className={style.dot} />
      <span className={style.dot} />
      <span className={style.dot} />
    </div>
  );
};

export default Loader;
