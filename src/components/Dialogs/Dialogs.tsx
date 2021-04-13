import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React, { ChangeEvent } from "react";
import { State } from "../../redux/redux-store";
import { Redirect } from "react-router-dom";

const Dialogs = (props: {
  updateNewMessageText: (message: string) => void;
  sendMessage: () => void;
  dialogsPage: State["dialogsPage"];
  isAuth: boolean;
}) => {
  let dialogElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem
      name={dialog.name}
      key={dialog.id}
      id={dialog.id}
      img={dialog.img}
    />
  ));

  let messageElements = props.dialogsPage.messages.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  let sendMessage = () => {
    props.sendMessage();
  };

  let onMessageUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let message = e.target.value;
    props.updateNewMessageText(message);
  };

  if (!props.isAuth) return <Redirect to={"/login"} />;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <textarea
          onChange={onMessageUpdate}
          value={props.dialogsPage.newMessageText}
        />
        <div>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
