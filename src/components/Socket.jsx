import { io } from 'socket.io-client';

let jwtRegex = /JWT=([^;]+)/;
let jwtMatch = document.cookie.match(jwtRegex);
let token = jwtMatch ? jwtMatch[1] : '';

const Socket = new io(process.env.REACT_APP_SERVER_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket'],
    auth: {
        token: token
    }
});

export default Socket;
