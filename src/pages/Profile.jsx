import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import timeAgo from "../utils/timesAgo";
import Post from "../components/Post";
import Modal from "../components/Modal";
import { fetchProfile } from "../utils/fetchProfile";
import { follow, unfollow, fetchFollowers, fetchFollowing } from "../utils/followAPIs";



const Profile = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [loggedInUser, setLoggedInUser] = useState();
    const [followed, setFollowed] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followersList, setFollowersList] = useState([]);



    useEffect(() => {
        fetchProfile(id, setPosts, setUser, setLoggedInUser, setFollowed);
    }, [id, followed]);

    return (
        <div className="m-4 pt-5">
            <div className="row">
                <div className="col-5">
                    <img src={user.profile_image} className="img-fluid" style={{ borderRadius: '50%', height: "200px", width: "200px", overflow: 'hidden' }} />
                </div>
                <div className="col-5 mt-4">
                    <h4>{user.username}</h4>
                    <h5>{user.following_count}
                        <Modal
                            name='Following'
                            title='Following'
                            content={user.following}
                            triggerButton='Following'
                            triggerButtonClassName='text-decoration-none text-dark ms-2'
                            scrollable={true}
                            onClick={() => fetchFollowing(id, setFollowingList)}
                            body={
                                <div>
                                    {followingList && followingList.map((user) => {
                                        return (
                                            <div key={user.following_id} className="m-2">
                                                <Link to={`/profile/${user.following_id}`} className="text-decoration-none text-dark">
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
                    </h5>
                    <h5>{user.followers_count}
                        <Modal
                            name='Followers'
                            title='Followers'
                            content={user.followers}
                            triggerButton='Followers'
                            triggerButtonClassName='text-decoration-none text-dark ms-2'
                            scrollable={true}
                            onClick={() => fetchFollowers(id, setFollowersList)}
                            body={
                                <div>
                                    {followersList && followersList.map((user) => {
                                        return (
                                            <div key={user.follower_id} className="m-2">
                                                <Link to={`/profile/${user.follower_id}`} className="text-decoration-none text-dark" data-bs-dismiss="modal">
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
                    </h5>
                    {loggedInUser == id ? <button className="btn btn-primary">Edit Profile</button> :
                        <div className="d-flex">
                            {followed ? <button onClick={(e) => unfollow(e, id, setFollowed)} className="btn btn-primary me-2">Unfollow</button> :
                                <button onClick={(e) => follow(e, id, setFollowed)} className="btn btn-primary me-2">Follow</button>
                            }
                            <Link to={`/chat/${id}`}
                                style={{ textDecoration: 'none', color: 'black' }}
                                state={{ user_id: user.user_id, username: user.username, profile_image: user.profile_image }}>
                                <button className="btn btn-primary">Message</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <hr />
            {posts.map((post) => {
                return (
                    <div key={post.post_id}>
                        <Post post={post} timeAgo={timeAgo} />
                    </div>
                );
            })}

        </div>
    );
}
export default Profile;