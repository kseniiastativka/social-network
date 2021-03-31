import React, { FC, ReactNode } from "react";
import { Store } from "./redux/redux-store";

const StoreContext = React.createContext<Store | null>(null);

export const Provider = (props: { store: Store; children: ReactNode }) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
