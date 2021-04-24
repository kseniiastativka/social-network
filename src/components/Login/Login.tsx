import { Field, Form, Formik } from "formik";
import { authAPI } from "../../api/api";
import { Input } from "../common/FormControls/FormControls";
import React from "react";
import * as Yup from "yup";

interface Values {
  email: string;
  password: string;
  rememberMe: boolean;
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

export const LoginForm = () => {
  return (
    <>
      <Formik<Values>
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={InputAreaSchema}
        onSubmit={(values, { setSubmitting }) => {
          authAPI.login(values).then((responce) => {
            if (responce.resultCode === 0) {
              setSubmitting(false);
            }
          });
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
              <label>
                Remember me
                <Field type="checkbox" name="rememberMe" />
              </label>

              <button type="submit" disabled={form.isSubmitting}>
                Log in
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export const Login = () => {
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginForm />
    </div>
  );
};
