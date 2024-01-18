import React from "react";
import useStyles from "@/hooks/useStyles";
import style from "./CarpetContainer.module.scss";

interface CarpetContainerProps {
  children: React.ReactNode;
  goldInset?: boolean;
  goldFrame?: boolean;
  className?: string;
}

const CarpetContainer: React.FC<CarpetContainerProps> = ({
  children,
  className,
  goldInset,
  goldFrame,
}) => {
  const { s } = useStyles();
  return (
    <div
      className={s([
        className,
        style.CarpetContainer,
        { [style.goldInset]: goldInset },
        { [style.goldFrame]: goldFrame },
      ])}
    >
      {children}
    </div>
  );
};

export default CarpetContainer;
