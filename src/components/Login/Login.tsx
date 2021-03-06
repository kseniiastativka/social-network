import { Field, Form, Formik } from "formik";
import { Input } from "../common/FormControls/FormControls";
import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { State } from "../../redux/redux-store";
import styles from "./Logn.module.css";

interface Values {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaUrl: string | undefined;
}

const InputAreaSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  rememberMe: Yup.boolean(),
});

const LoginForm = ({
  loginError,
  onsubmit,
  captchaUrl,
}: {
  onsubmit: (values: Values) => void;
  loginError?: string;
  captchaUrl: string | undefined;
}) => {
  return (
    <>
      <Formik<Values>
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
          captchaUrl: undefined,
        }}
        validationSchema={InputAreaSchema}
        onSubmit={(values, { setSubmitting }) => {
          onsubmit(values);
          setSubmitting(false);
        }}
      >
        {(form) => {
          return (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder={"email"}
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder={"password"}
                component={Input}
              />
              {loginError !== undefined && (
                <div className={styles.error}>{loginError}</div>
              )}
              <label>
                Remember me
                <Field type="checkbox" name="rememberMe" />
              </label>

              <button type="submit" disabled={form.isSubmitting}>
                Log in
              </button>
              {captchaUrl !== undefined && <img src={captchaUrl} />}
              {captchaUrl && (
                <Field
                  type="captcha"
                  name="captcha"
                  placeholder={"captcha"}
                  component={Input}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const LoginWrapper = (props: {
  login: (values: Values) => void;
  isAuth: boolean;
  loginErrorMessage: string | undefined;
  captchaUrl: string | undefined;
}) => {
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginForm
        onsubmit={props.login}
        loginError={props.loginErrorMessage}
        captchaUrl={props.captchaUrl}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isAuth: state.userAuth.isAuth,
  loginErrorMessage: state.userAuth.loginErrorMessage,
  captchaUrl: state.userAuth.captchaUrl,
});

export const Login = connect(mapStateToProps, { login })(LoginWrapper);
