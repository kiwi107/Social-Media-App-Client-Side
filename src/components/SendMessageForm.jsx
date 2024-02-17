import React from 'react'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import Socket from './Socket';

const SendMessageForm = ({ mobile, id, chatID }) => {
  const [message, setMessage] = useState(null); // controlled input for form

  const [cookies] = useCookies(['userID']);

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      chat_id: chatID,
      message: message,
      sender_id: cookies.userID,
      receiver_id: id
    }
    console.log(data)
    Socket.emit('message', data);
    setMessage('');
    e.target.reset();
  }

  return (
    <form onSubmit={sendMessage} style={{ position: 'fixed', bottom: mobile ? '40px' : '0', backgroundColor: 'white', width: mobile ? '100%' : '40%' }}>
      <div className="row">
        <div className="col-9 m-2">
          <textarea className="form-control" rows={1} onChange={(e) => {
            setMessage(e.target.value)
            Socket.emit('typing', { user_id: cookies.userID, chat_id: chatID, receiver_id: id });
          }}
            onBlur={() => {
              Socket.emit('stopTyping', { user_id: cookies.userID, chat_id: chatID });
            }}
            type="text" placeholder="Message" />
        </div>
        <div className="col-2 m-2 justify-content-end d-flex">
          <button className="btn btn-primary" type="submit">Send</button>
        </div>
      </div>
    </form>
  )
}

export default SendMessageForm