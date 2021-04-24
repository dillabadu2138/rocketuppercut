import React, { Fragment, useState } from "react";

// Redux
import { addExperience } from "../../_actions/profileAction";
import { setAlert } from "../../_actions/alertAction";
import { useDispatch } from "react-redux";

// Client-side Form validation
function validate(company, title, from) {
  // Store errors for all fields in a single array
  const errors = [];

  if (company === "") errors.push("기업명은 필수 항목입니다.");
  if (title === "") errors.push("역할은 필수 항목입니다.");
  if (from === "") errors.push("시작일은 필수 항목입니다.");

  return errors;
}

const initialState = {
  company: "",
  title: "",
  from: "",
  to: "",
  current: false,
  description: "",
};

const AddExperience = ({ show, toggleForm }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const change = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const clickAdd = (event) => {
    event.preventDefault();

    // Validate form
    const errors = validate(formData.company, formData.title, formData.from);

    if (errors.length > 0) {
      const firstError = errors[0];
      dispatch(setAlert(firstError, "danger"));

      // Early return
      return;
    }

    // Dispatch an action
    dispatch(addExperience(formData));

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
          <p className="my-1">경력 추가</p>
          <div className="my-1">
            <label>기업명</label>
            <input
              type="text"
              name="company"
              placeholder="예: 로켓어퍼컷"
              autoComplete="off"
              value={formData.company}
              onChange={change}
            />
          </div>

          <div className="my-1">
            <label>역할</label>
            <input
              type="text"
              name="title"
              placeholder="예: UI 디자이너, 프론트엔드 개발자"
              autoComplete="off"
              value={formData.title}
              onChange={change}
            />
          </div>

          <div className="my-1">
            <label>재직 기간</label>
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
            <span>재직 중</span>
          </div>

          <div className="my-1">
            <label>간단 설명</label>
            <textarea
              name="description"
              placeholder="예시) UI 디자이너로써 사이트 전반적인 IA에서부터 와이어프레이밍, 스타일 가이드 및 디자인 업무를 담당했다."
              cols="30"
              rows="4"
              value={formData.description}
              onChange={change}
            />
          </div>

          <button className="btn btn-lightgrey" onClick={clickCancel}>
            취소
          </button>
          <input type="submit" className="btn btn-primary" value="경력 추가" />
        </form>
        <div className="ui__divider my-1"></div>
      </Fragment>
    )
  );
};

export default AddExperience;
