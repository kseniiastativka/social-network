import React, { ComponentType, FC } from "react";
import { Redirect } from "react-router-dom";
import { State } from "../../redux/redux-store";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state: State) => ({
  isAuth: state.userAuth.isAuth,
});

const connector = connect(mapStateToPropsForRedirect);

export function withAuthRedirect<Props extends {}>(
  Component: ComponentType<Props>
): ComponentType<Props> {
  const RedirectComponent: FC<Props & { isAuth: boolean }> = (props) => {
    if (!props.isAuth) {
      return <Redirect to={"/login"} />;
    }
    return <Component {...props} />;
  };

  // @ts-ignore It's impossible to type it correctly
  return connector(RedirectComponent);
}
