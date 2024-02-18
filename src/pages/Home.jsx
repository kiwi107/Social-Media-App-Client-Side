import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Post from '../components/Post';
import timeAgo from '../utils/timesAgo';
import Socket from '../components/Socket';
import { fetchPosts } from '../utils/fetchPosts';
import { postsContext } from '../App';
import LoadingPosts from '../components/LoadingPosts';

const Home = () => {
    const [cookies, setCookie] = useCookies(['auth', 'userID', 'JWT']);
    const { posts, setPosts } = useContext(postsContext);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const bottomBoundaryRef = useRef(null);

    useEffect(() => {
        if (cookies.auth === false) {
            navigate('/login');
        }


        fetchPosts(posts, setPosts, setCookie, navigate, pageNumber, setLoading, setHasMore, cookies.JWT);
       

        Socket.on('connect', () => {
            console.log('connected');
        });

        Socket.on('disconnect', () => {
            console.log('disconnected');
        });

        return () => {
            Socket.off('connect');
            Socket.off('disconnect');
        };
    }, [pageNumber]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            },
            { threshold: 1 }
        );

        if (bottomBoundaryRef.current) {
            observer.observe(bottomBoundaryRef.current);
        }

        return () => observer.disconnect();
    }, [loading, hasMore]);

    useEffect(() => {
        // Clear posts when component unmounts
        return () => {
            setPosts([]);
        };
    }, []);

    return (
        <div className="mt-5 py-3 justify-content-center">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.post_id + '#Post'}>
                        <Post post={post} timeAgo={timeAgo} />
                    </div>
                ))) : (

                <>
                    <LoadingPosts />

                </>
            )}
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <div ref={bottomBoundaryRef}></div>
        </div>
    );
};

export default Home;
