import React from "react";
import classes from "./Post.module.scss";
import { API_URL } from "../../../Model/api/axios";
import like from "../../../assets/icons/iconLike.svg";
import comment from "../../../assets/icons/iconCommet.svg";
import share from "../../../assets/icons/share.svg";

const Post = ({ post }) => {
  return (
    <div className={classes.post}>
      <div className={classes.postImg}>
        <img
          src={`${API_URL}/images/${post.images[0].name}`}
          alt="Фотография поста"
        />
      </div>
      <div className={classes.postBody}>
        <div className={classes.postUser}>
          <img src={`${API_URL}/images/${post.images[0].name}`} alt="" />
          <div className={classes.postUserBody}>
            <div className={classes.postUserName}>{post.user.username}</div>
            <div className={classes.posyUserSubcribes}>120к подписчиков</div>
          </div>
        </div>
        {/*   {new Date(post.createdAt).getDate()} */}
        <h3 className={classes.postTitle}>{post.title}</h3>
        <p className={classes.postText}>{post.subtitle}</p>
        <div className={classes.postBottom}>
          <div className={classes.postBottomBody}>
            <div className={classes.postLikes}>
              <img src={like} alt="" />
              {post.likesCount}
            </div>
            <div className={classes.postComments}>
              <img src={comment} alt="" />
              {post.commentsCount}
            </div>
          </div>
          <div className={classes.postShare}>
            <img src={share} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
