export function likePost(e, post_id, likes, setLikes, setUserHasLiked, JWT) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/posts/like`, {
        method: 'POST',
        body: JSON.stringify({
            post_id: post_id,
        }),
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .then(res => {
            if (res.message === "Post liked") {
                setLikes(likes + 1);
                setUserHasLiked(true);
            } else {
                console.log(res.message)

            }
        }).catch(err => {
            console.log(err);
        });
};
export function unlikePost(e, post_id, likes, setLikes, setUserHasLiked, JWT) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/posts/unlike/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
        credentials: 'include',

    })
        .then(res => res.json())
        .then(res => {
            if (res.message === "Post unliked") {
                setLikes(likes - 1);
                setUserHasLiked(false);
            } else {
                console.log(res.message)

            }
        }).catch(err => {
            console.log(err);
        });
}

export const fetchLikes = async (post_id, setLikesList, JWT) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/posts/likes/${post_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .then(res => {
            setLikesList(res.likes);
        }).catch(err => {
            console.log(err);
        });
}

