import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const makeNaviClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header>
      <nav className={css.navDirection}>
        <NavLink to="/" className={makeNaviClass}>
          HOME
        </NavLink>
        <NavLink to="/movie" className={makeNaviClass}>
          MOVIES
        </NavLink>
      </nav>
    </header>
  );
}
