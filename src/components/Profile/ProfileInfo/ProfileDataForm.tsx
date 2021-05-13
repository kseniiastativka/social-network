import { ProfileType, State } from "../../../redux/redux-store";
import React from "react";
import { Input, Textarea } from "../../common/FormControls/FormControls";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import s from "./ProfileInfo.module.css";
import styles from "../../Login/Logn.module.css";
import { connect } from "react-redux";

const requiredString = Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Required");
const InputAreaSchema = Yup.object().shape({
  fullName: requiredString,
  aboutMe: requiredString,
  lookingForAJobDescription: requiredString,
  lookingForAJob: Yup.boolean(),
});

const ProfileDataForm = (props: {
  profile: ProfileType | undefined;
  onsubmit: (profile: ProfileType) => void;
  error?: string;
}) => {
  const { profile } = props;

  if (profile === undefined) {
    return null;
  }

  return (
    <>
      <Formik<ProfileType>
        initialValues={profile}
        validationSchema={InputAreaSchema}
        onSubmit={(values, { setSubmitting }) => {
          props.onsubmit(values);
          setSubmitting(false);
        }}
      >
        {() => {
          return (
            <Form>
              <div>
                <button>Save</button>
              </div>
              <div>
                <b>Full name</b>:
                <Field
                  type="fullName"
                  name="fullName"
                  placeholder={"Full name"}
                  component={Input}
                />
              </div>

              <div>
                <b>About me </b>
                <Field
                  type="aboutMe"
                  name="aboutMe"
                  placeholder={"About me"}
                  component={Input}
                />
              </div>

              <div>
                <b>Looking for a job:</b>{" "}
                <Field
                  type="checkbox"
                  name="lookingForAJob"
                  placeholder={"Looking for a job"}
                />
              </div>
              <div>
                My professional skills:
                <Field
                  type="lookingForAJobDescription"
                  name="lookingForAJobDescription"
                  placeholder={"My professional skills"}
                  component={Textarea}
                />
              </div>

              <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                  return (
                    <div className={s.contact}>
                      <b>
                        {key}:
                        <Field
                          type="lookingForAJobDescription"
                          name={`contacts.${key}`}
                          placeholder={key}
                          component={Input}
                        />
                      </b>
                    </div>
                  );
                })}
              </div>
              <div>
                {props.error !== undefined && (
                  <div className={styles.error}>{props.error}</div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  error: state.profilePage.profileEditError,
  profile: state.profilePage.profile,
});

export const ProfileDataFormConnected = connect(mapStateToProps)(
  ProfileDataForm
);
