import "./AppMenu.scss";
import React from "react";
import { RoutesEnum } from "@/Router";
import { Location, useNavigate } from "react-router-dom";
import { ExitToApp, Settings } from "@mui/icons-material";
import {
  Dropdown,
  ListItemDecorator,
  MenuButton,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/joy";

interface MenuProps {
  currenPage: Location<RoutesEnum>;
}

const AppMenu: React.FC<MenuProps> = ({ currenPage }) => {
  const navigate = useNavigate();

  const isHomePage = currenPage.pathname === RoutesEnum.HOME;

  return (
    <div id="Menu">
      {!isHomePage && (
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
                <ExitToApp />
              </ListItemDecorator>
              Quit game
            </MenuItem>
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default AppMenu;
