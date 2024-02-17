import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useState, useRef } from 'react';
import { bootstrapFormValidation } from '../utils/bootstrapFormValidation';








const Login = () => {
    const [cookies, setCookie] = useCookies(['userID', 'auth'])
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const formRef = useRef(null);





    const handleSubmit = (e) => {
        e.preventDefault();
        bootstrapFormValidation(e, formRef.current);
        fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if (res.auth) {
                    const oneDay = 60 * 60 * 24 * 1000;
                    const expiryDate = new Date(Date.now() + oneDay);
                    setCookie('userID', res.user.user_id, { path: '/', expires: expiryDate });
                    setCookie('auth', true)
                    navigate('/')
                } else {
                    setCookie('auth', false)
                    setError(res.message);
                }
            }).catch(err => {
                console.log(err);
            });
    };



    return (

        <div className="container" >
            <div className="d-flex justify-content-center align-items-center mt-5 ">
                <div className="d-inline">
                    <img src="kiwi.png" className="img-fluid" alt="logo" style={{ height: '50px', width: '70px' }} />
                </div>
                <div className="d-inline ms-2">
                    <span style={{ fontSize: 40 }}>KIWIGRAM</span>
                </div>
            </div>



            <div className="row justify-content-center mt-5 ">

                <div className="col-10">
                    {error === null ? null : <div className="alert alert-danger" role="alert">

                        {error}
                    </div>
                    }
                    <form ref={formRef} onSubmit={handleSubmit} style={{ textAlign: 'center' }} className='needs-validation' noValidate>
                        <div className='has-validation'>
                            <input onChange={(e) => setUsername(e.target.value)} className="form-control my-3" type="text" name="username" placeholder="username" required />
                            <div className='invalid-feedback'>
                                Please enter a username
                            </div>
                        </div>
                        <div className='has-validation'>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control my-3" name="password" placeholder="password" required />
                            <div className='invalid-feedback'>
                                Please enter a password
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <input type="submit" className="btn btn-primary" value="login" />
                        </div>
                        don't have an account? <Link to="/register">register</Link>
                    </form>


                </div>
            </div>
        </div>
    );

}
export default Login;