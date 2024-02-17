import { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import Socket from '../components/Socket';



export const useSocket = (id, setMessages, setChatID, messages, chatID) => {
    const [cookies] = useCookies(['userID']);

    const joinChatRoom = (data) => {
        Socket.emit('joinRoom', data);
    }


    useEffect(() => {
        function chatSocket() {

            const data = {
                user1_id: id,
                user2_id: cookies.userID
            }

            joinChatRoom(data);

            Socket.on('messages', (data) => {
                setMessages(data.messages);
                setChatID(data.chat_id);
            })



            Socket.on('messageReceived', (data) => {
                console.log('message received')
                setMessages([...messages, data]);
            })
            return () => {
                Socket.off('messages');
                Socket.off('messageReceived');
            }

        }

        return () => chatSocket();



    }, [messages])


}
