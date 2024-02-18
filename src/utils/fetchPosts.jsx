export const fetchPosts = (posts, setPosts, setCookie, navigate, pageNumber, setLoading, setHasMore, JWT) => {
    if (pageNumber > 1) setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/posts?page=${pageNumber}&limit=2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'JWT': JWT || '',
        },
        credentials: 'include',
    })
        .then(res => {
            if (res.status == 401 || res.status == 403) {
                const oneYear = 60 * 60 * 24 * 1000 * 365;
                const expiryDate = new Date(Date.now() + oneYear);
                setCookie('auth', false, { path: '/', expires: expiryDate });
                navigate('/login');
            } else {
                const oneYear = 60 * 60 * 24 * 1000 * 365;
                const expiryDate = new Date(Date.now() + oneYear);
                setCookie('auth', true, { path: '/', expires: expiryDate });
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
