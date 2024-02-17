import React, { useEffect } from 'react'
import { useContext} from 'react'
import { Link } from 'react-router-dom'
import { onlineUsersContext, typingContext } from '../App'
import Socket from './Socket'


const ChatHeader = ({ mobile, prevPage, chatID }) => {
    const { onlineUsers } = useContext(onlineUsersContext);
    const { typing, setTyping } = useContext(typingContext);

    useEffect(() => {
        let typingTimeout;
        const handleTyping = (data) => {
            if (data.chat_id === chatID) {
                setTyping(true);
                //handle the typing timeout
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    setTyping(false);
                }, 1000);
            }
        };
        Socket.on('typing', handleTyping);
        return () => {
            Socket.off('typing', handleTyping);
        };
    }, [setTyping, chatID]);

    return (
        <div className="p-3" style={{ backgroundColor: 'white', position: 'fixed', width: '100%', marginTop: mobile ? '45px' : '0' }}>
            <Link to={`/profile/${prevPage.user_id}`} className="text-decoration-none text-dark">
                <div className="d-flex align-items-center" >
                    <img src={prevPage.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                    <div className="flex-column align-items-center ms-2">
                        <h5>{prevPage.username}</h5>
                        {typing ? (
                            <i>typing...</i>
                        ) : (
                            onlineUsers.includes(prevPage.user_id?.toString()) ? (
                                <i style={{ color: 'green' }}>online</i>
                            ) : (
                                <i style={{ color: 'red' }}>offline</i>
                            )
                        )
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatHeader