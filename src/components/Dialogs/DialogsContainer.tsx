import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { Dispatch, State } from "../../redux/redux-store";
import { connect } from "react-redux";

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
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;
