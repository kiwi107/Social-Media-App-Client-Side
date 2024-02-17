export const fetchPosts = (posts, setPosts, setCookie, navigate, pageNumber, setLoading, setHasMore) => {
    if (pageNumber > 1) setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/posts?page=${pageNumber}&limit=2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => {
            if (res.status == 401 || res.status == 403) {
                setCookie('auth', false)
                navigate('/login');
            } else {
                setCookie('auth', true)
                return res.json()
            }
        })
        //403 token expired
        .then(res => {
            setPosts([...posts, ...res.posts]);
            setHasMore(res.hasMore)
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
};
