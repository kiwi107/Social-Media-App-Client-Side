import Socket from "../components/Socket";
export const logout = (setCookie, navigate) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(res => {
            if (res.message === 'Logout successful') {
                setCookie('auth', false)
                //delete userID cookie
                setCookie('userID', '', { path: '/' });
                Socket.disconnect();
                navigate('/login');
            } else {
                setCookie('auth', false)
               
            }
        })
        .catch(err => {
            console.log(err);
        });
};