import { io } from 'socket.io-client';
let jwtRegex = /JWT=([^;]+)/;
let jwtMatch = document.cookie.match(jwtRegex);
const Socket = new io(process.env.REACT_APP_SERVER_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket'],
    auth: {
        token: jwtMatch[1] || ''
    }
});


export default Socket;
