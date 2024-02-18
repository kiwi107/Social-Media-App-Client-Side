import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import timeAgo from "../utils/timesAgo";
import Post from "../components/Post";
import AddCommentForm from "../components/AddCommentForm";
import Comment from "../components/Comment";





const PostDetails = () => {
    const { id } = useParams(); // get the id from the url
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const location = useLocation()
    const prevPage = location.state || ''
    const [cookies] = useCookies(['JWT']);




    const fetchPost = async () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'JWT': cookies.JWT || '',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                setPost(data.post);
                setComments(data.comments);
            });
    };

    useEffect(() => {
        fetchPost();
        if (prevPage.trigger === 'comment') {
            const textarea = document.getElementById('commentFormTextarea')
            textarea.focus()

        }
        if (prevPage.trigger === 'viewComments') {
            window.scrollTo(0, document.body.scrollHeight)
        }

    }, []);


    return (
        <div className="m-4">

            <Post
                post={post}
                timeAgo={timeAgo} />


            <AddCommentForm post_id={post.post_id} comments={comments} setComments={setComments} />


            {comments.map((comment) => {
                return (
                    <div key={comment.comment_id}>
                        <Comment comment={comment} timeAgo={timeAgo} />
                    </div>
                );
            })}

        </div>

    );
};

export default PostDetails;