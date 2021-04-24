import React from "react";
import formatDate from "../../utils/formatDate";

// Redux
import { deleteEducation } from "../../_actions/profileAction";
import { useDispatch, useSelector } from "react-redux";

const ProfileInfoEducation = ({
  edu: { _id, school, degree, fieldofstudy, from, to },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);

  const click = () => {
    if (window.confirm("선택한 학력을 정말로 삭제하시겠습니까?")) {
      dispatch(deleteEducation(_id));
    } else {
      // Do nothing!
    }
  };

  return (
    <div className="block__content">
      <div className="block__content__detail">
        <span className="block__content__detail__title">{school}</span>
        <span className="block__content__detail__subtitle">{`${fieldofstudy}(${degree})`}</span>
        <p className="block__content__detail__period">
          {formatDate(from)} - {to ? formatDate(to) : "현재"}
        </p>
      </div>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <button className="block__content__delete" onClick={click}>
            <i className="fas fa-times" />
          </button>
        )}
    </div>
  );
};

export default ProfileInfoEducation;
