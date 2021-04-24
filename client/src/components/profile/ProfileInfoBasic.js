import React from "react";

const ProfileInfoBasic = ({ profile: { user, status, fields } }) => {
  return (
    <div className="block__info">
      <div className="block__info__key">상태</div>
      <p className="block__info__value">{status ? status : "미입력"}</p>
      <div className="block__info__key">업무분야</div>
      <p className="block__info__value">
        {fields.length > 0 ? fields.join(", ").toString() : "미입력"}
      </p>
    </div>
  );
};

export default ProfileInfoBasic;
