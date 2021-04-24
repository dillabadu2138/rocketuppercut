import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { deleteAccount } from "../../_actions/profileAction";
import { useDispatch, useSelector } from "react-redux";

const AccountSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleDelete = (event) => {
    event.preventDefault();

    // Delete account
    dispatch(deleteAccount(history));
  };

  return (
    <div className="account__settings">
      <p className="account__settings__category">계정 관리</p>
      <div className="account__settings__box">
        <div className="account__settings__box__content">
          <div className="title">이메일</div>
          <p>{user && user.email}</p>
        </div>
        <button onClick={() => {}}>수정</button>
      </div>

      <p className="account__settings__category">회원탈퇴 신청</p>
      <div className="account__settings__box">
        <p>탈퇴할 경우 모든 데이터는 삭제되며 복구할 수 없습니다.</p>
        <button onClick={handleDelete}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default AccountSettings;
