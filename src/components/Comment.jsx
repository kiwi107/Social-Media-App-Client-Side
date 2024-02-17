import { Link } from "react-router-dom"
const Comment = ({ comment, timeAgo }) => {
  return (
    <div className="card m-1">
      <div className='row'>
        <Link to={`/profile/${comment.user_id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div className='col d-flex  align-items-center'>
            <img src={comment.profile_image} className="img-fluid m-1" alt="profile" style={{ borderRadius: '30px', overflow: 'hidden', height: '50px', width: '50px' }} />
            <div className="align-items-center">
              <h5 className="card-title m-1 mt-3">{comment.username}</h5>
              <p className="card-title m-1">{comment.text}</p>
            </div>
            <div className='d-flex ms-auto me-5'>
              <h6 className="card-title">{timeAgo(comment.created_at)}</h6>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Comment