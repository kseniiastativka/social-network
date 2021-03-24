import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import Friends from "./Friend/Friends";

const Navbar = (props: {
  state: { friends: { id: number; name: string; img: string }[] };
}) => {
  return (
    <div className={s.nav}>
      <nav>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.active}>
            Profile
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.active}>
            Messages
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/news" activeClassName={s.active}>
            News
          </NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <NavLink to="/music" activeClassName={s.active}>
            Music
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.active}>
            Settings
          </NavLink>
        </div>
      </nav>

      <div>
        <h3>Friends</h3>
        <Friends friends={props.state.friends} />
      </div>
    </div>
  );
};
export default Navbar;
