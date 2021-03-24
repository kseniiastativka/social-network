import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props: {
  state: {
    dialogs: { id: number; name: string; img: string }[];
    messages: { id: number; message: string }[];
  };
}) => {
  let dialogElements = props.state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} img={dialog.img} />
  ));

  let messageElements = props.state.messages.map((message) => (
    <Message message={message.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>{messageElements}</div>
    </div>
  );
};

export default Dialogs;
