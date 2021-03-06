import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

const DialogItem = (props: { name: string; id: number; img: string }) => {
  let path = "/dialogs/" + props.id;

  return (
    <>
      <div className={s.dialog + " " + s.active}>
        <img src={props.img} alt="" className={s.img} />
        <NavLink to={path}> {props.name}</NavLink>
      </div>
    </>
  );
};

export default DialogItem;
