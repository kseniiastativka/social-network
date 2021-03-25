import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

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

  let addMessageElement = React.createRef<any>();
  let addMessage = () => {
    let text = addMessageElement.current.value;
    alert(text);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <textarea ref={addMessageElement}></textarea>
        <div>
          <button onClick={addMessage}>Add message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
