import React from "react";
import Switch from "@/components/Switch";
import style from "./WellSwitch.module.scss";
import useAppSettings from "@/hooks/useAppSettings";

const WellSwitch: React.FC = () => {
  const { appSettings, saveAppSettings } = useAppSettings();

  return (
    <div className={style.wellSwitch}>
      <Switch
        label="Turn on well mode 🕳️"
        checked={appSettings.game.cards.well}
        onChange={(e) => {
          const newAppSettings = { ...appSettings };
          newAppSettings.game.cards.well = e.target.checked;
          saveAppSettings(newAppSettings);
        }}
      />
    </div>
  );
};

export default WellSwitch;
