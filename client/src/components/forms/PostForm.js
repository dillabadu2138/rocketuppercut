import React, { Fragment, useState } from 'react';

// Redux
import { addPost } from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const PostForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    dispatch(addPost({ text }));

    // Reset the form after submitting
    setText('');
  };

  return (
    <Fragment>
      <form className='post__form form my-1' onSubmit={submit}>
        <div className='post__form__left'>
          <img className='ui__image' src={auth.user.avatar} alt='' />
        </div>
        <div className='post__form__right'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='아는 사람들과 글을 공유해보세요.'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className='post__form__right__button'>
            <input type='submit' className='btn btn-primary' value='등록' />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default PostForm;
