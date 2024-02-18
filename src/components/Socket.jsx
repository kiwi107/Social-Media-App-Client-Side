import { io } from 'socket.io-client';


const Socket = new io(process.env.REACT_APP_SERVER_URL, {
    autoConnect: false,
    withCredentials: true,
});


export default Socket;
