import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { recentChatsContext, typingContext } from '../App';
import '../hover.css';
import Socket from './Socket'


const MessagesList = () => {
    const { recentChats, setRecentChats } = useContext(recentChatsContext);
    const [cookies] = useCookies(['userID']);
    const [typing, setTyping] = useState(false);
    const [whichChatIsTyping, setWhichChatIsTyping] = useState(0);


    function extractTime(timestamp) {
        return timestamp?.slice(11, 16);
    }

    useEffect(() => {
        let typingTimeout;
        const handleTyping = (data) => {
            setWhichChatIsTyping(data.chat_id);
            setTyping(true);
            //handle the typing timeout
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                setTyping(false);
                setWhichChatIsTyping(0)
            }, 1000);
        };
        Socket.on('typing', handleTyping);
    }, [])

    return (
        <div>
            {recentChats && recentChats.map((user) => (
                <Link to={`/chat/${user.user_id}`}
                    key={user.user_id}
                    style={{ textDecoration: 'none', color: 'black' }}
                    state={{ user_id: user.user_id, username: user.username, profile_image: user.profile_image }} >
                    <div key={user.username} className='d-flex align-items-center m-1 hover-effect' data-bs-dismiss="offcanvas" >
                        <img src={user.profile_image} className="img-fluid m-1" alt="profile" style={{ borderRadius: '30px', overflow: 'hidden', height: '50px', width: '50px' }} />
                        <div className='ms-1 flex-column'>
                            <h5 className="card-title">{user.username}</h5>
                            <div className={`d-flex ${user.unread_count > 0 ? 'text-primary' : 'text-secondry'}`} style={{ width: '300px' }}>
                                {whichChatIsTyping === user.chat_id ? ('typing..') : (
                                    <>
                                        <small>{user.last_message} </small>
                                        <div className='d-flex ms-auto' >
                                            <small className="me-2">{extractTime(user.last_message_time)}</small>
                                            {user.unread_count > 0 && (<span className="badge rounded-circle bg-primary">{user.unread_count}</span>)}
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    )
}

export default MessagesList