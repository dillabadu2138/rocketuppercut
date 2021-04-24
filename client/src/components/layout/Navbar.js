import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { logoutUser } from '../../_actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const authLinks = (
    <div>
      <Link to='/search-profile'>
        <i className='fas fa-search' />
        <span className='hide-sm'> 사람</span>
      </Link>
      <Link to='/home'>
        <i className='fas fa-home' />
        <span className='hide-sm'> 홈</span>
      </Link>
      <Link to={`/profile/${user && user._id}`}>
        <i className='fas fa-user' />
        <span className='hide-sm'> 프로필</span>
      </Link>
      <a onClick={() => dispatch(logoutUser())} href='#!'>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'> 로그아웃</span>
      </a>
    </div>
  );

  const guestLinks = (
    <div>
      <Link to='/search-profile'>
        <i className='fas fa-search' /> <span className='hide-sm'>사람</span>
      </Link>
      <Link to='/login'>로그인</Link>
      <Link to='/register'>회원가입</Link>
    </div>
  );

  return (
    <nav className='navbar'>
      <div className='navbar__items'>
        <Link to='/'>
          <i className='fas fa-rocket navbar__items__logo' />
        </Link>
        {token !== null ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
