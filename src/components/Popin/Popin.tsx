import React from "react";
import style from "./Popin.module.scss";
import useStyles from "@/hooks/useStyles";

interface PopinProps {
  visible: boolean;
  children: React.ReactNode;
  className: string;
}

const Popin: React.FC<PopinProps> = ({ visible, children, className }) => {
  const { s } = useStyles();
  return (
    visible && <div className={s([className, style.popin])}>{children}</div>
  );
};

export default Popin;
