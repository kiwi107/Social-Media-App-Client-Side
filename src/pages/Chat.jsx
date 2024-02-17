import { useState, useEffect, useContext } from "react"
import Socket from '../components/Socket';
import { useParams, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { typingContext } from "../App";
import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";
import SendMessageForm from "../components/SendMessageForm";



const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [chatID, setChatID] = useState(0);
    const [cookies] = useCookies(['userID']);

    const location = useLocation()
    const prevPage = location.state || '';
    const { typing, setTyping } = useContext(typingContext);
    const { id } = useParams();

    const joinChatRoom = (data) => {
        Socket.emit('joinRoom', data);
    }
    useEffect(() => {
        //scroll to the button of the chat container
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 50);

    }, [id, messages]);

    useEffect(() => {
        const data = {
            user1_id: id,
            user2_id: cookies.userID
        }
        joinChatRoom(data);

        const loadMessages = (data) => {
            setMessages(data.messages);
            setChatID(data.chat_id);
        };

        let typingTimeout;
        const handleReceivedMessage = (data) => {
            if (data.chat_id === chatID) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };

        const handleTyping = (data) => {
            if (data.chat_id === chatID) {
                setTyping(true);
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    setTyping(false);
                }, 1000);
            }
        };

        const handleStopTyping = () => {
            clearTimeout(typingTimeout);
            setTyping(false);
        };

        Socket.on('messages', loadMessages);
        Socket.on('messageReceived', handleReceivedMessage);
        Socket.on('typing', handleTyping);
        Socket.on('stopTyping', handleStopTyping);

        return () => {
            Socket.off('messages', loadMessages);
            Socket.off('messageReceived', handleReceivedMessage);
            Socket.off('typing', handleTyping);
            Socket.off('stopTyping', handleStopTyping);
        };

    }, [id, cookies.userID, setTyping, chatID]);

    useEffect(() => {
        // When component unmounts (route changes), emit 'leaveroom' event with chatID
        // this is important to avoid marking msgs unread if the user is in the room
        return () => {
            Socket.emit('leaveRoom', { chat_id: chatID });
        };
    }, [chatID]);


    return (
        <>
            <div className="d-md-none">
                <ChatHeader mobile={true} prevPage={prevPage} chatID={chatID} />
            </div>
            <div className="d-none d-md-block">
                <ChatHeader mobile={false} prevPage={prevPage} chatID={chatID} />
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ marginTop: '140px', marginBottom: '90px' }}>
                    {messages.map((message) => (
                        message.sender_id === cookies.userID ? (
                            <Message message={message} sender={true} />
                        ) : (
                            <Message message={message} sender={false} />
                        )
                    ))}
                </div>


                <div className="d-none d-md-block">

                    <SendMessageForm mobile={false} id={id} chatID={chatID} />
                </div>
                <div className="d-md-none">
                    <SendMessageForm mobile={true} id={id} chatID={chatID} />
                </div>
            </div>
        </>

    )
}

export default Chat
