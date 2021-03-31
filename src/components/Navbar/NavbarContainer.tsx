import React from "react";
import StoreContext from "../../StoreContext";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  return (
    <>
      <StoreContext.Consumer>
        {(store) => {
          if (store === null) {
            return null;
          }
          let state = store.getState().navbar;

          return <Navbar navbarPage={state} />;
        }}
      </StoreContext.Consumer>
    </>
  );
};
export default NavbarContainer;
