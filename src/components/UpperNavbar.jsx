import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { logout } from "../utils/logout";
import { useRef, useState, useContext } from 'react';
import '../hover.css';
import { postsContext } from '../App';




const Navbar = () => {
    const [cookies, setCookie] = useCookies(['userID', 'auth']);
    const navigate = useNavigate();
    const postTextRef = useRef();// post form
    const postImageRef = useRef();// post form
    const [error, setError] = useState(null);
    const closeModal = useRef(null);
    const { posts, setPosts } = useContext(postsContext);


    const createPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', postTextRef.current.value);
        formData.append('image', postImageRef.current.files[0]);


        fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.message === "Post created") {
                    // fetchPosts();
                    //trigger click
                    closeModal.current.click();
                    postTextRef.current.value = '';
                    setPosts([res.post, ...posts]);
                } else {
                    setError(res.message);
                }
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <div style={{ position: 'fixed',width:'20%'}}>
                <nav className="nav flex-column pt-3 ms-3 d-none d-md-block">
                    <div className='d-flex align-items-center'>
                        <img src="/kiwi.png" alt="logo" style={{ height: '50px' }} />
                        <Link className="navbar-brand ms-2" to="/"><h5>KIWIGRAM</h5></Link>
                    </div>

                    <Link className="d-flex align-items-center my-2 ps-2 hover-effect" to="/"><i className="fs-2 bi bi-house"></i><h6 className='mt-2 ms-2'> Home</h6> </Link>

                    <Link className="d-flex align-items-center my-2 ps-2 hover-effect" to="/search"><i className="fs-2 bi bi-search"></i><h6 className='mt-2 ms-2'> Search</h6> </Link>
                    <span className="d-flex align-items-center my-2 ps-2 hover-effect" type="button" data-bs-toggle="modal" data-bs-target="#createPostModal">
                        <i className="fs-2 bi bi-plus-circle"></i> <h6 className='mt-2 ms-2'>Create Post</h6>
                    </span>
                    <Link className="d-flex align-items-center my-2 ps-2 hover-effect" to={/profile/ + cookies.userID}><i className="fs-2 bi bi-person-circle"></i> <h6 className='mt-2 ms-2'>Profile</h6></Link>
                    <Link onClick={() => logout(setCookie, navigate)} className="d-flex align-items-center my-2 ps-2 hover-effect" to="/Login"><i className="fs-2 bi bi-box-arrow-right"></i> <h6 className='mt-2 ms-2'>Logout</h6></Link>

                </nav>
            </div>




            <div className="modal fade" id="createPostModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">create post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {error === null ? null : <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                            }
                            <form onSubmit={createPost}>
                                <div className="mb-3">
                                    <textarea ref={postTextRef} className="form-control" id="postText" rows="3" placeholder="What's on your mind?"></textarea>
                                </div>
                                <div className="form-group">
                                    <h6 className='mr-3'>Upload Image</h6>
                                    <input ref={postImageRef} type="file" className="form-control" accept="image/*" />
                                </div>
                                <div className="modal-footer">
                                    <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Post</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
