export const fetchProfile = async (id, setPosts, setUser, setLoggedInUser, setFollowed) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${id}`, {
        method: "GET",
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
            setPosts(data.userPosts)
            setUser(data.user)
            setLoggedInUser(data.loggedInUserId)
            setFollowed(data.user.user_has_followed)
        });

};