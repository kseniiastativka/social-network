import Navbar from "./Navbar";
import { connect } from "react-redux";
import { State } from "../../redux/redux-store";

const mapStateToProps = (state: State) => {
  return {
    navbarPage: state.navbar,
  };
};
const mapDispatchToProps = () => {
  return {};
};
const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default NavbarContainer;
