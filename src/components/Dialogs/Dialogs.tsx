import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { State } from "../../redux/redux-store";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../common/FormControls/FormControls";

export interface DialogProps {
  sendMessage: (message: string) => void;
  dialogsPage: State["dialogsPage"];
}

interface Values {
  message: string;
}

const TextAreaSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const TextMessageForm = (props: { onSubmit: (message: string) => void }) => {
  return (
    <>
      <Formik<Values>
        initialValues={{ message: "" }}
        validationSchema={TextAreaSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.onSubmit(values.message);
          setSubmitting(false);
          resetForm();
        }}
      >
        {(form) => {
          return (
            <Form>
              <Field
                component={Textarea}
                type="message"
                name="message"
                placeholder={"Enter your message"}
              />
              <div>
                <button type="submit" disabled={form.isSubmitting}>
                  Send Message
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const Dialogs = (props: DialogProps) => {
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

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <TextMessageForm onSubmit={props.sendMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
