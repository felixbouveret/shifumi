import React from "react";
import { useNavigate } from "react-router-dom";
import { ExitToApp, Settings, Tune } from "@mui/icons-material";
import {
  Dropdown,
  ListItemDecorator,
  MenuButton,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/joy";

const GameMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { size: "lg" } }}
      >
        <Settings />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => navigate("/")}>
          <ListItemDecorator>
            <Tune />
          </ListItemDecorator>{" "}
          Settings
        </MenuItem>
        <MenuItem onClick={() => navigate("/")}>
          <ListItemDecorator>
            <ExitToApp />
          </ListItemDecorator>{" "}
          Quit game
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default GameMenu;
