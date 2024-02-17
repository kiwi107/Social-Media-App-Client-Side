import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout } from "../utils/logout";


const BottomNavbar = () => {
    const [cookies, setCookie] = useCookies(['userID', 'auth'])
    const navigate = useNavigate();

    return (
        <footer className="bg-body-tertiary" style={{ marginTop: 'auto', position: 'fixed', bottom: '0', width:'100%' }}>
            <div className='d-md-none'>
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <Link className="nav-link mx-4" to="/"><i className="fs-1 bi bi-house"></i></Link>
                    </div>
                    <div className="text-center">
                        <Link className="nav-link mx-4" to="/search"><i className="fs-2 bi bi-search"></i></Link>
                    </div>
                    <span className="text-center" type="button" data-bs-toggle="modal" data-bs-target="#createPostModal">
                        <i className="fs-2 bi bi-plus-circle mx-4"></i>
                    </span>
                    <div className="text-center">
                        <Link to={`/profile/${cookies.userID}`} className="nav-link  mx-4"><i className="fs-1 bi bi-person-circle"></i></Link>
                    </div>
                    <div className="text-center">
                        <Link onClick={() => logout(setCookie, navigate)} className="nav-link mx-4" to="/Login"><i className="fs-1 bi bi-box-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default BottomNavbar