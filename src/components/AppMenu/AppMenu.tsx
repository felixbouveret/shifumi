import Button from "../Button";
import style from "./AppMenu.module.scss";
import useStyles from "@/hooks/useStyles";
import React, { useEffect, useRef } from "react";
import { RoutesEnum } from "@/Router";
import { Location, useNavigate } from "react-router-dom";
import { ExitToApp, Settings } from "@mui/icons-material";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, onClick }) => (
  <li className={style.menuItem}>
    <button onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  </li>
);

interface MenuProps {
  currenPage: Location<RoutesEnum>;
}

const AppMenu: React.FC<MenuProps> = ({ currenPage }) => {
  const navigate = useNavigate();
  const { s } = useStyles();

  const wrapperRef = useRef(null);
  const [menuDisplayed, setMenuDisplayed] = React.useState(true);

  const isHomePage = currenPage.pathname === RoutesEnum.HOME;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !(wrapperRef.current as HTMLElement).contains(event.target as Node)
    )
      setMenuDisplayed(false);
  };

  const onItemClicked = (route: RoutesEnum) => {
    navigate(route);
    setMenuDisplayed(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [menuDisplayed]);

  return (
    <div className={style.menu} ref={wrapperRef}>
      {!isHomePage && (
        <>
          <Button
            iconButton
            variant="clear"
            onClick={() => setMenuDisplayed((e) => !e)}
            color="white"
          >
            <Settings />
          </Button>
          <ul
            className={s([
              style.menuList,
              { [style.menuListDisplayed]: menuDisplayed },
            ])}
          >
            <MenuItem
              onClick={() => onItemClicked(RoutesEnum.HOME)}
              label="Quit game"
              icon={<ExitToApp />}
            />
          </ul>
        </>
      )}
    </div>
  );
};

export default AppMenu;
