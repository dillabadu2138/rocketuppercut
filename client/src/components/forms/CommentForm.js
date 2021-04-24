import React, { useRef } from 'react';

// Redux
import { addComment } from '../../_actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ postId }) => {
  // const [text, setText] = useState('댓글을 입력하세요...');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const textRef = useRef();

  const submit = (e) => {
    e.preventDefault();

    // Add comment
    const text = textRef.current.innerText;
    dispatch(addComment(postId, { text }));

    // Reset the form after submitting
    textRef.current.innerText = '';
  };

  return (
    <div className='comment my-1'>
      <div className='comment__left'>
        <img className='ui__image' src={auth.user.avatar} alt='' />
      </div>
      <div className='comment__right'>
        <form className='comment__right__form' onSubmit={submit}>
          <div
            className='comment__right__form__text'
            data-placeholder='댓글을 입력하세요...'
            contentEditable={true}
            ref={textRef}
          ></div>
          <div>
            <input type='submit' className='btn btn-primary' value='등록' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
