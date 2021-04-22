import { addPostActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { Dispatch, State } from "../../../redux/redux-store";

const mapStateToProps = (state: State) => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addPost: (message: string) => {
      dispatch(addPostActionCreator(message));
    },
  };
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
