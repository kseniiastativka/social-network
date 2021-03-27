import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = (props: {
  state: {
    dialogs: { id: number; name: string; img: string }[];
    messages: { id: number; message: string }[];
    newMessageText: string;
  };
  sendMessage: () => void;
  updateNewMessageText: (updatedText: string) => void;
}) => {
  let dialogElements = props.state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} img={dialog.img} />
  ));

  let messageElements = props.state.messages.map((message) => (
    <Message message={message.message} />
  ));

  let addMessageElement = React.createRef<any>();

  let sendMessage = () => {
    props.sendMessage();
  };

  let onMessageUpdate = () => {
    let message = addMessageElement.current.value;
    props.updateNewMessageText(message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <textarea
          ref={addMessageElement}
          onChange={onMessageUpdate}
          value={props.state.newMessageText}
        />
        <div>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
