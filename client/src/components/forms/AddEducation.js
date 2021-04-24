import React, { Fragment, useState } from "react";

// Redux
import { addEducation } from "../../_actions/profileAction";
import { setAlert } from "../../_actions/alertAction";
import { useDispatch } from "react-redux";

// Client-side Form validation
function validate(school, degree, fieldofstudy, from) {
  // Store errors for all fields in a single array
  const errors = [];

  if (school === "") errors.push("학교명은 필수 항목입니다.");
  if (degree === "") errors.push("학위는 필수 항목입니다.");
  if (fieldofstudy === "") errors.push("전공은 필수 항목입니다.");
  if (from === "") errors.push("입학일은 필수 항목입니다.");

  return errors;
}

const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  current: false,
};

const AddEducation = ({ show, toggleForm }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const change = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const clickAdd = (event) => {
    event.preventDefault();

    // Validate form
    const errors = validate(
      formData.school,
      formData.degree,
      formData.fieldofstudy,
      formData.from
    );

    if (errors.length > 0) {
      const firstError = errors[0];
      dispatch(setAlert(firstError, "danger"));

      // Early return
      return;
    }

    // Dispatch an action
    dispatch(addEducation(formData));

    // Reset form
    setFormData({ ...initialState });

    // Toggle form visibility (Show)
    toggleForm();
  };

  const clickCancel = () => {
    // Reset form
    setFormData({ ...initialState });

    // Toggle form visibility (Hide)
    toggleForm();
  };

  return (
    show && (
      <Fragment>
        <form className="form" onSubmit={clickAdd}>
          <p className="my-1">학력 추가</p>
          <div className="my-1">
            <label>학교</label>
            <input
              type="text"
              name="school"
              placeholder="예: 제주대학교"
              autoComplete="off"
              value={formData.school}
              onChange={change}
            />
          </div>

          <div className="my-1">
            <label>학위</label>
            <input
              type="text"
              name="degree"
              placeholder="예: 학사"
              autoComplete="off"
              value={formData.degree}
              onChange={change}
            />
          </div>

          <div className="my-1">
            <label>전공</label>
            <input
              type="text"
              name="fieldofstudy"
              placeholder="예: 해양학"
              autoComplete="off"
              value={formData.fieldofstudy}
              onChange={change}
            />
          </div>

          <div className="my-1">
            <label>재학 기간</label>
            <div className="period">
              <input
                type="date"
                name="from"
                value={formData.from}
                onChange={change}
              />
              <div style={{ margin: "0 1rem" }}>-</div>
              <input
                type="date"
                name="to"
                value={formData.to}
                onChange={change}
                disabled={formData.current}
              />
            </div>
            <input
              type="checkbox"
              name="current"
              checked={formData.current}
              value={formData.current}
              onChange={() => {
                setFormData({ ...formData, current: !formData.current });
              }}
            />{" "}
            <span>재학 중</span>
          </div>

          <button className="btn btn-lightgrey" onClick={clickCancel}>
            취소
          </button>
          <input type="submit" className="btn btn-primary" value="학력 추가" />
        </form>
        <div className="ui__divider my-1"></div>
      </Fragment>
    )
  );
};

export default AddEducation;
