import { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, Link } from "react-router-dom";

const Search = () => {
  const [result, setResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [cookies, setCookie] = useCookies(['auth', 'userID', 'JWT']);
  const searchInput = useRef();
  const navigate = useNavigate();

  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile/users?username=${searchKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'JWT': cookies.JWT || '',
      },
      credentials: 'include',

    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          setCookie('auth', false);
          navigate('/login');
        } else {
          setCookie('auth', true);
          return res.json();
        }
      })
      .then(res => {
        setResult(res.result);
      })
      .catch(err => {
        console.log(err);
      });
  };


  useEffect(() => {
    searchInput.current.focus();

    if (searchKey.length > 0) {
      fetchUsers();
    } else {
      setResult([]);
    }
  }, [searchKey]);




  return (
    <div className="px-3 mt-5">
      <input ref={searchInput} onChange={(e) => {
        setSearchKey(e.target.value);
      }
      } type="text" className="form-control mt-4" placeholder="Search" />
      {result && result.map(user => (
        <div key={user.user_id} className="m-2">
          <Link to={`/profile/${user.user_id}`} className="text-decoration-none text-dark">
            <div className="d-flex align-items-center" >
              <img src={user.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} alt={`${user.username}'s profile`} />
              <div className="flex-column">
                <h5 style={{ marginBottom: '0px' }} className="ms-2">{user.username}</h5>
                <small className="ms-2 fs-8 text-secondary">{user.full_name}</small>
              </div>
            </div>
          </Link>
        </div>
      ))}

    </div>
  )
}

export default Search