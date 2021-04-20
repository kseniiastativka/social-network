import { ErrorMessage, Field, Form, Formik } from "formik";
import { authAPI } from "../../api/api";

interface Values {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm = () => {
  return (
    <>
      <Formik<Values>
        initialValues={{ email: "", password: "", rememberMe: false }}
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
              <Field type="email" name="email" placeholder={"email"} />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" placeholder={"password"} />
              <ErrorMessage name="password" component="div" />
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
