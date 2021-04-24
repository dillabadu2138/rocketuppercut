import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const Landing = () => {
  // Redirect to profile once you are logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (isAuthenticated && user !== null) {
    return <Redirect to={`/profile/${user._id}`} />;
  }

  return (
    <div className='landing'>
      <h1>
        <span style={{ fontWeight: 'normal' }}>일로 연결되는 사람들,</span>
        <br></br>
        <strong style={{ fontWeight: 'bold' }}>로켓어퍼컷</strong>
      </h1>
      <p className='my-1'>
        이미 회원이신가요? <Link to='/login'>로그인</Link>
      </p>
      <Link
        to='/register'
        className='btn'
        style={{ width: '100%', textAlign: 'center' }}
      >
        <i className='far fa-envelope'></i> 이메일로 회원가입
      </Link>
      <p className='my-1' style={{ fontize: '12px' }}>
        회원가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
      </p>
    </div>
  );
};

export default Landing;
