import React from "react";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import style from "./WellSwitch.module.scss";
import useAppSettings from "@/hooks/useAppSettings";

const WellSwitch: React.FC = () => {
  const { appSettings, saveAppSettings } = useAppSettings();

  return (
    <div className={style.wellSwitch}>
      <Switch
        checked={appSettings.game.cards.well}
        onChange={(e) => {
          const newAppSettings = { ...appSettings };
          newAppSettings.game.cards.well = e.target.checked;
          saveAppSettings(newAppSettings);
        }}
      >
        Enable well mode
        <Icon name="well" size={16} />
      </Switch>
    </div>
  );
};

export default WellSwitch;
