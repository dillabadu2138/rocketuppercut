import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

// Redux
import { loginUser } from "../../_actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const submit = (formData) => {
    dispatch(loginUser(formData));
  };

  // Redirect to profile once you are logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (isAuthenticated && user !== null) {
    return <Redirect to={`/profile/${user._id}`} />;
  }

  return (
    <div className="login">
      <h1>로그인</h1>
      <p className="my-1">
        회원이 아니신가요? <Link to="/register">회원가입</Link>
      </p>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <div className="my-1">
          <input
            name="email"
            placeholder="이메일"
            ref={register({
              required: {
                value: true,
                message: "필수 입력사항입니다.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "유효한 이메일 주소가 아닙니다.",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="my-1">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            ref={register({
              required: {
                value: true,
                message: "필수 입력사항입니다.",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <input type="submit" className="btn btn-primary" value="로그인" />
      </form>
    </div>
  );
};

export default Login;
