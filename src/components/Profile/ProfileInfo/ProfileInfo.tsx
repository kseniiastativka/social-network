import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";
import { ProfilePage, ProfileType } from "../../../redux/redux-store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/female.png";

const ProfileInfo = (props: {
  profile: ProfileType;
  status: ProfilePage["status"];
  updateUserStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
}) => {
  const onMainPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      props.savePhoto(file);
    }
  };
  return (
    <>
      <div>
        {/*<img*/}
        {/*  width="800"*/}
        {/*  src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"*/}
        {/*  alt=""*/}
        {/*/>*/}
      </div>
      <div>{props.profile.fullName}</div>
      <div>About me {props.profile.aboutMe}</div>
      <div>Looking for a job {props.profile.lookingForAJob}</div>
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
    </>
  );
};

export default ProfileInfo;
