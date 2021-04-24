import { FieldProps } from "formik";
import React, { FC } from "react";
import styles from "./FormControls.module.css";

const FormControl: FC<FieldProps<string>> = ({ field, form, ...props }) => {
  const hasError = form.errors[field.name] && form.touched[field.name];
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      {props.children}
      {hasError ? <div>{form.errors[field.name]}</div> : null}
    </div>
  );
};
export const Textarea: FC<FieldProps<string>> = (props) => {
  const { field, form, ...rest } = props;
  return (
    <FormControl {...props}>
      <textarea {...field} {...rest} />
    </FormControl>
  );
};

export const Input: FC<FieldProps<string>> = (props) => {
  const { field, form, ...rest } = props;
  return (
    <FormControl {...props}>
      <input {...field} {...rest} />
    </FormControl>
  );
};
