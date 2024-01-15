import "./Popin.scss";
import React from "react";

interface PopinProps {
  visible: boolean;
  children: React.ReactNode;
  className: string;
}

const Popin: React.FC<PopinProps> = ({ visible, children, className }) => {
  return visible && <div className={`popin ${className}`}>{children}</div>;
};

export default Popin;
