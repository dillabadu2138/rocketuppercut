import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileCommon from "./ProfileCommon";
import PostForm from "../forms/PostForm";
import ProfilePostItem from "./ProfilePostItem";

// Redux
import { getProfileById } from "../../_actions/profileAction";
import { getPostsById } from "../../_actions/postAction";
import { useDispatch, useSelector } from "react-redux";

const ProfilePosts = ({ match }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);
  const posts = useSelector((state) => state.post.posts);
  const loadingPost = useSelector((state) => state.post.loading);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
    dispatch(getPostsById(match.params.id));
  }, [dispatch, match.params.id]);

  return profile === null || loadingPost ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProfileCommon profile={profile} />

      <div className="ui__divider"></div>

      <div className="profile__content">
        <div className="profile__tab">
          <Link to={`/profile/${profile.user._id}`}>정보</Link>
          <Link
            to={`/profile/${profile.user._id}/posts`}
            className="profile__tab__current"
          >
            게시물
          </Link>
        </div>

        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id && (
            <div className="ui__block">
              <PostForm />
            </div>
          )}

        {posts.map((item) => {
          return <ProfilePostItem key={item._id} post={item} />;
        })}
      </div>
    </Fragment>
  );
};

export default ProfilePosts;
