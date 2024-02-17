import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { likePost, unlikePost, fetchLikes } from '../utils/likeAPIs';

const Post = ({ post, timeAgo }) => {
  const location = useLocation();
  const [likes, setLikes] = useState(post.likes_count);
  const [user_has_liked, setUserHasLiked] = useState(post.user_has_liked);
  const [likesList, setLikesList] = useState([]);

  useEffect(() => {
    setLikes(post.likes_count)
    setUserHasLiked(post.user_has_liked)
  }, [post])

  return (
    <div className="card bg-light mb-3" style={{ boxShadow: '0 0 7px 0 rgba(0,0,0,0.2)' }}>
      <div className="card-body">
        <div className='row'>
          <Link to={/profile/ + post.user_id} key={post.post_id + "Profile"} style={{ textDecoration: 'none', color: 'black', display: 'flex' }}>
            <div className='col d-flex  align-items-center'>
              <img src={`${post.profile_image}`} className="img-fluid m-1" alt="profile" style={{ borderRadius: '30px', overflow: 'hidden', height: '50px', width: '50px' }} />
              <h5 className="card-title m-1">{post.username}</h5>
            </div>
          </Link>
        </div>

        <Link to={/post/ + post.post_id} key={post.post_id + "PostDetails"} style={{ textDecoration: 'none', color: 'black' }}>
          {post.text && (
            <>
              <hr />
              <p className="card-title">{post.text}</p>

            </>
          )}
          {post.image && (
            <>
              <img src={post.image} className="img-fluid mb-2" alt="post" style={{ height: '200px' }} />
            </>

          )}
        </Link>
        <br />

        <i onClick={user_has_liked ? (e) => unlikePost(e, post.post_id, likes, setLikes, setUserHasLiked) : (e) => likePost(e, post.post_id, likes, setLikes, setUserHasLiked)}
          className={user_has_liked ? 'bi bi-suit-heart-fill me-2 fs-3' : 'bi bi-suit-heart me-2 fs-3'}
          style={{ color: "red" }}>
        </i>

        <Link to={`/post/${post.post_id}`}
          state={{ trigger: 'comment' }}
          key={post.post_id + "Comment"}
          style={{ textDecoration: 'none', color: 'black' }}>
          <i className="bi bi-chat fs-3"><span></span></i>
        </Link>
        <br />

        {likes > 0 ? (

          <><Modal
            name={`likes${post.post_id}`}
            title='Likes'
            triggerButton={likes > 1 ? ` ${likes} likes` : `${likes} like`}
            triggerButtonClassName='text-decoration-none text-dark'
            scrollable={true}
            onClick={() => fetchLikes(post.post_id, setLikesList)}
            body={
              <div>
                {likesList && likesList.map((user) => {
                  return (
                    <div key={user.user_id} className="m-2">
                      <Link to={`/profile/${user.user_id}`} className="text-decoration-none text-dark">
                        <div data-bs-dismiss="modal" className="d-flex align-items-center" >
                          <img src={user.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                          <h5 className="ms-2">{user.username}</h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            }



          />
          </>
        ) : null}
        <br />
        {!location.pathname.includes('/post') ? (
          <Link to={/post/ + post.post_id}
            key={post.post_id + "Comments"}
            state={{ trigger: 'viewComments' }}
            style={{ textDecoration: 'none', color: 'black' }}>
            {post.comments_count > 1 && (
              <>view all {post.comments_count > 0 && post.comments_count} comment</>
            )}
          </Link>
        ) : null}
        <span className='d-block mt-2' style={{ color: 'gray' }}>{timeAgo(post.created_at)}</span>
      </div>
    </div>
  )
}

export default Post