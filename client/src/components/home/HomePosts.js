import React, { Fragment, useEffect } from 'react';
import HomePostItem from './HomePostItem';
import PostForm from '../forms/PostForm';

// Redux
import { getPosts } from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className='home__content'>
        <div className='ui__block'>
          <PostForm />
        </div>
        {posts.map((post) => (
          <HomePostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
