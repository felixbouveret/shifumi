import React from "react";
import style from "./WellSwitch.module.scss";
import useAppSettings from "@/hooks/useAppSettings";
import { Switch, Typography } from "@mui/joy";

const WellSwitch: React.FC = () => {
  const { appSettings, saveAppSettings } = useAppSettings();

  return (
    <div className={style.wellSwitch}>
      <Typography
        component="label"
        startDecorator={
          <Switch
            size="lg"
            checked={appSettings.game.cards.well}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newAppSettings = { ...appSettings };
              newAppSettings.game.cards.well = event.target.checked;
              saveAppSettings(newAppSettings);
            }}
          />
        }
      >
        Turn on well card 🕳️
      </Typography>
    </div>
  );
};

export default WellSwitch;
