import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { deleteComment } from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleDeleteComment = () => {
    dispatch(deleteComment(postId, _id));
  };

  return (
    <div className='comment__item my-1'>
      <Link to={`/profile/${user}`}>
        <img className='ui__image' src={avatar} alt='' />
      </Link>
      <div className='comment__item__right'>
        <div className='comment__item__content'>
          <span className='comment__item__name'>{name}</span>
          <div className='comment__item__text'>{text}</div>
        </div>
        {!auth.loading && auth.user && user === auth.user._id && (
          <div>
            <button
              className='comment__item__delete'
              onClick={handleDeleteComment}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
