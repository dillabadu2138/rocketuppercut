import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Redux
import { registerUser } from '../../_actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const dispatch = useDispatch();

  const submit = (formData) => {
    dispatch(registerUser(formData));
  };

  // Redirect to profile once you are logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (isAuthenticated && user !== null) {
    return <Redirect to={`/profile/${user._id}`} />;
  }

  return (
    <div className='register'>
      <h1>회원가입</h1>
      <p className='my-1'>
        이미 회원이신가요? <Link to='/login'>로그인</Link>
      </p>
      <form className='form' onSubmit={handleSubmit(submit)}>
        <div className='my-1'>
          <input
            name='email'
            placeholder='이메일'
            ref={register({
              required: {
                value: true,
                message: '필수 입력사항입니다.',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효한 이메일 주소가 아닙니다.',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className='my-1'>
          <input
            type='text'
            name='name'
            placeholder='이름'
            ref={register({
              required: {
                value: true,
                message: '필수 입력사항입니다.',
              },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className='my-1'>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            ref={register({
              required: {
                value: true,
                message: '필수 입력사항입니다.',
              },
              minLength: {
                value: 5,
                message: '비밀번호는 최소 5자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className='my-1'>
          <input
            type='password'
            name='confirmPassword'
            placeholder='비밀번호 재입력'
            ref={register({
              required: {
                value: true,
                message: '필수 입력사항입니다.',
              },
              validate: (value) =>
                value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <input type='submit' className='btn btn-primary' value='회원가입' />
      </form>
    </div>
  );
};

export default Register;
