import "./CarpetContainer.scss";
import React from "react";

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
  return (
    <div
      className={[
        "CarpetContainer",
        className,
        goldInset ? "goldInset" : "",
        goldFrame ? "goldFrame" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default CarpetContainer;
