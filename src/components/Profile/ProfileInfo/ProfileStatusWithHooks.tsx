import React, { ChangeEvent, useEffect, useState } from "react";

const ProfileStatusWithHooks = (props: {
  status: string;
  updateUserStatus: (status: string) => void;
}) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <>
      {!editMode && (
        <div>
          <span
            onDoubleClick={() => {
              activateEditMode();
            }}
          >
            Status:{props.status}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
            type="text"
          />
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;
