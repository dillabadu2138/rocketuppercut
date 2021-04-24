import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

// Redux
import { addLike, removeLike, deletePost } from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const HomePostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const clickLike = () => {
    auth.loading === false && auth.isAuthenticated
      ? dispatch(addLike(_id))
      : history.push('/login');
  };

  const clickUnlike = () => {
    auth.loading === false && auth.isAuthenticated
      ? dispatch(removeLike(_id))
      : history.push('/login');
  };

  const clickDelete = () => {
    dispatch(deletePost(_id));
  };

  return (
    <div className='ui__block'>
      <div className='post__header'>
        <Link to={`/profile/${user}`}>
          <img className='ui__image' src={avatar} alt='' />
        </Link>
        <div className='post__header__right'>
          <div className='post__header__right__details'>
            <span className='post__name'>{name}</span>
            <div className='post__date'>{formatDate(date)}에 게시됨</div>
          </div>
          {!auth.loading && auth.user && user === auth.user._id && (
            <button
              className='post__header__right__delete'
              onClick={clickDelete}
            >
              삭제
            </button>
          )}
        </div>
      </div>
      <p className='post__text'>{text}</p>

      <div className='post__count'>
        <span>{likes.length > 0 && `좋아요 ${likes.length}개`}</span>
        <span>{comments.length > 0 && `답변 ${comments.length}개`}</span>
      </div>

      <div className='ui__divider'></div>

      <div className='post__action'>
        <button className='column' onClick={clickLike}>
          <i className='fas fa-heart' /> 좋아요
        </button>
        <button className='column' onClick={clickUnlike}>
          <i className='fas fa-heart-broken' /> 싫어요
        </button>
        <Link className='column' to={`/post/${_id}`}>
          <i className='fas fa-comment' /> 댓글
        </Link>
      </div>
    </div>
  );
};

export default HomePostItem;
