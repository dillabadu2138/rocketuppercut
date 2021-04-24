import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import CommentForm from '../forms/CommentForm';
import CommentItem from './CommentItem';
import formatDate from '../../utils/formatDate';

// Redux
import {
  getPost,
  addLikeOnSinglePost,
  removeLikeOnSinglePost,
  deletePost,
} from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const SinglePost = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match.params.id]);

  const clickLike = () => {
    auth.loading === false && auth.isAuthenticated
      ? dispatch(addLikeOnSinglePost(post._id))
      : history.push('/login');
  };

  const clickUnlike = () => {
    auth.loading === false && auth.isAuthenticated
      ? dispatch(removeLikeOnSinglePost(post._id))
      : history.push('/login');
  };

  const clickDelete = () => {
    dispatch(deletePost(post._id));

    history.push(`/profile/${profile.user._id}/posts`);
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='lightgrey__background'>
        <div className='ui__block'>
          <div className='post__header'>
            <Link to={`/profile/${post.user}`}>
              <img className='ui__image' src={post.avatar} alt='' />
            </Link>
            <div className='post__header__right'>
              <div className='post__header__right__details'>
                <span className='post__name'>{post.name}</span>
                <div className='post__date'>
                  {formatDate(post.date)}에 게시됨
                </div>
              </div>
              {!auth.loading && auth.user && post.user === auth.user._id && (
                <button
                  className='post__header__right__delete'
                  onClick={clickDelete}
                >
                  삭제
                </button>
              )}
            </div>
          </div>
          <p className='post__text'>{post.text}</p>

          <div className='post__count'>
            <span>
              {post.likes.length > 0 && `좋아요 ${post.likes.length}개`}
            </span>
            <span>
              {post.comments.length > 0 && `답변 ${post.comments.length}개`}
            </span>
          </div>

          <div className='ui__divider'></div>

          <div className='post__action'>
            <button className='column' onClick={clickLike}>
              <i className='fas fa-thumbs-up' /> 좋아요
            </button>
            <button className='column' onClick={clickUnlike}>
              <i className='fas fa-thumbs-down' /> 싫어요
            </button>
          </div>

          <div className='ui__divider'></div>

          <CommentForm postId={post._id} />

          {post.comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default SinglePost;
