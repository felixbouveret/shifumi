import * as CardsIcon from "@/assets/cards";
import React from "react";
import { CardIcons } from "@/types/game.interface";

interface IconProps {
  name: CardIcons | null;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  if (!name) return <></>;
  return (
    <img
      className={className}
      src={CardsIcon[name]}
      alt={name}
      width={size}
      height={size}
    />
  );
};

export default Icon;
