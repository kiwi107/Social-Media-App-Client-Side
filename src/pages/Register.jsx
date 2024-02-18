import { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { bootstrapFormValidation } from '../utils/bootstrapFormValidation';



const Register = () => {
    const [cookies, setCookie] = useCookies(['auth', 'userID', 'JWT']);
    const navigate = useNavigate();
    const formRef = useRef(null);

    //controlled inputs
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [error, setError] = useState(null);



    const handleSubmit = (e) => {
        e.preventDefault();
        bootstrapFormValidation(e, formRef.current);
        let formData = new FormData();
        formData.append('fullName', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('dob', dob);
        formData.append('image', profileImage);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (res.auth) {
                    const oneYear = 60 * 60 * 24 * 1000 * 365;
                    const expiryDate = new Date(Date.now() + oneYear);
                    setCookie('auth', true, { path: '/', expires: expiryDate });
                    setCookie('userID', res.user.user_id, { path: '/', expires: expiryDate });
                    setCookie('JWT', res.token, { path: '/', expires: expiryDate, sameSite: 'None', secure: true });
                    navigate('/')
                } else {
                    window.scrollTo(0, 0);

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
                            <input onChange={(e) => { setFullname(e.target.value) }} type="text" className="form-control m-3" name="fullname" placeholder="name" required />
                            <div className="invalid-feedback">
                                Please enter your name
                            </div>
                        </div>
                        <div className='has-validation'>
                            <input onChange={(e) => { setUsername(e.target.value) }} className="form-control m-3" type="text" name="username" placeholder="username" required />
                            <div className="invalid-feedback">
                                Please enter a username
                            </div>
                        </div>
                        <div className='has-validation'>
                            <input onChange={(e) => { setEmail(e.target.value) }} className="form-control m-3" type="email" name="email" placeholder="email" required />
                            <div className="invalid-feedback">
                                Please enter a valid email
                            </div>
                        </div>
                        <div className='has-validation'>
                            <input onChange={(e) => { setDob(e.target.value) }} className="form-control m-3" type="date" name="dob" placeholder="date of birth" required />
                            <div className="invalid-feedback">
                                Please enter your date of birth
                            </div>
                        </div>

                        <div className="form-group my-5">
                            <div className="d-flex justify-content-start m-3">
                                <h6>Upload Profile Picture</h6>

                            </div>
                            <input onChange={(e) => { setProfileImage(e.target.files[0]) }} type="file" className="form-control ms-3" id="profileImage" accept="image/*" />
                        </div>


                        <div className='has-validation'>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control m-3" name="password" placeholder="password" required />
                            <div className="invalid-feedback">
                                Please enter a password
                            </div>
                        </div>
                        <div className='has-validation'>
                            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" className="form-control m-3" name="confirmPassword" placeholder="confirm password" required />
                            <div className="invalid-feedback">
                                Please confirm your password
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <input type="submit" className="btn btn-primary" value="register" />
                        </div>
                        already have an account? <Link to="/login">login</Link>

                    </form>
                </div>
            </div>
        </div>
    );

}
export default Register;