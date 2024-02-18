export const follow = (e, id, setFollowed, JWT) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/follow/${id}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Followed") {
                setFollowed(true);
            }
        });
}

export const unfollow = (e, id, setFollowed, JWT) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/unfollow/${id}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Unfollowed") {
                setFollowed(false);
            }
        });
}


export const fetchFollowing = (id, setFollowingList, JWT) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/following/${id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setFollowingList(data.following);
        });
}

export const fetchFollowers = (id, setFollowersList, JWT) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/followers/${id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setFollowersList(data.followers);
        });
}