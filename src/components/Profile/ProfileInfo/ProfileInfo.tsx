import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.css";
import { ProfilePage, ProfileType } from "../../../redux/redux-store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/female.png";
import { ProfileDataFormConnected } from "./ProfileDataForm";

const ProfileInfo = (props: {
  profile: ProfileType;
  status: ProfilePage["status"];
  updateUserStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
}) => {
  const onMainPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      props.savePhoto(file);
    }
  };
  const onsubmit = (profile: ProfileType) => {
    props.saveProfile(profile).then(() => {
      setEditMode(false);
    });
  };
  let [editMode, setEditMode] = useState(false);
  return (
    <>
      <div>
        <img
          src={props.profile.photos.large || userPhoto}
          className={s.mainPhoto}
          alt=""
        />
        {props.isOwner && <input type="file" onChange={onMainPhotoChange} />}
      </div>
      <div className={s.descriptionBlock}>
        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      </div>
      {editMode ? (
        <ProfileDataFormConnected onsubmit={onsubmit} />
      ) : (
        <ProfileData
          profile={props.profile}
          isOwner={props.isOwner}
          goToEditMode={() => {
            setEditMode(true);
          }}
        />
      )}
    </>
  );
};

export const Contact = ({
  contactTitle,
  contactValue,
}: {
  contactTitle: string;
  contactValue: string;
}) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

const ProfileData = (props: {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
}) => {
  return (
    <>
      {props.isOwner && (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      )}

      <div>
        <b>Full name</b>:{props.profile.fullName}
      </div>
      <div>
        <b>About me </b>
        {props.profile.aboutMe}
      </div>

      <div>
        <b>Looking for a job:</b> {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          My professional skills: {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Contacts</b>:
        {Object.entries(props.profile.contacts).map(([key, value]) => (
          <Contact contactTitle={key} contactValue={value} />
        ))}
      </div>
    </>
  );
};

export default ProfileInfo;
