import React from "react";
import s from "./ProfileInfo.module.css";
import { ProfilePage, ProfileType } from "../../../redux/redux-store";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props: {
  profile: ProfileType;
  status: ProfilePage["status"];
  updateUserStatus: (status: string) => void;
}) => {
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
        <img src={props.profile.photos.small} alt="" />
      </div>
      <div className={s.descriptionBlock}>
        <ProfileStatus
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      </div>
    </>
  );
};
export default ProfileInfo;
