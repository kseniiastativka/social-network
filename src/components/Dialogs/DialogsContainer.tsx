import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs, { DialogProps } from "./Dialogs";
import { Dispatch, State } from "../../redux/redux-store";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { ComponentType } from "react";

let mapStateToProps = (state: State) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateNewMessageText: (message: string) => {
      dispatch(updateNewMessageTextActionCreator(message));
    },
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
  };
};

export default compose<
  ComponentType<DialogProps>,
  ComponentType<DialogProps>,
  ComponentType<{}>
>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
