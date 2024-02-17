import UpperNavbar from './components/UpperNavbar';
import UpperNavBarMobile from './components/UpperNavBarMobile';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import BottomNavbar from './components/BottomNavbar';
import MessagesList from './components/MessagesList';
import Chat from './pages/Chat';
import Socket from './components/Socket';
import Search from './pages/Search';
import ScrollToTop from './utils/scrollToTop';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

export const onlineUsersContext = createContext({ onlineUsers: [], setOnlineUsers: () => { } });
export const postsContext = createContext({ posts: [], setPosts: () => { } });
export const recentChatsContext = createContext({ recentChats: [], setRecentChats: () => { } });
export const typingContext = createContext({ typing: false, setTyping: () => { } });
export const darkModeContext = createContext({ darkMode: false, setDarkMode: () => { } });



function App() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [cookies] = useCookies(['auth']);
  const [typing, setTyping] = useState(false);
  



  useEffect(() => {
    if (cookies.auth) {
      Socket.connect()
      Socket.on('onlineUsersUpdate', (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });
      Socket.on('recentChatsUpdate', (recentChats) => {
        setRecentChats(recentChats);
      });

      return () => {
        Socket.off('onlineUsersUpdate')
      }
    } else {

      Socket.disconnect()

    }
  }, [cookies.auth]);

  return (
    <CookiesProvider>
      <onlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
        <postsContext.Provider value={{ posts, setPosts }}>
          <recentChatsContext.Provider value={{ recentChats, setRecentChats }}>
            <typingContext.Provider value={{ typing, setTyping }}>
              <BrowserRouter>
                <>
                  {cookies.auth ? <UpperNavBarMobile /> : null}
                  <div className='row no-gutters'>
                    <div className={cookies.auth ? 'col-lg-3 col-md-12' : 'col-12'}>
                      {cookies.auth ? <UpperNavbar /> : null}

                    </div>
                    <div className={cookies.auth ? 'col-lg-5 col-md-12' : 'col-12'} style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                      <ScrollToTop />

                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/post/:id" element={<PostDetails />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/chat/:id" element={<Chat />} />
                        <Route path="/search" element={<Search />} />
                      </Routes>

                    </div>
                    {cookies.auth ?
                      <div className="col-4">
                        <div className="navbar navbar-expand-lg sticky-md-top">
                          <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
                            <div className="offcanvas-header ms-auto">
                              <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className='sticky-top'>
                              <h4 className='p-2'>Messages</h4>

                              <ul className="nav nav-pills mb-3 btn-group" id="pills-tab" role="tablist">
                                <li style={{ width: '50%' }} className="nav-item" role="presentation">
                                  <button style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0', width: '100%' }} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Recent chats</button>
                                </li>
                                <li style={{ width: '50%' }} className="nav-item" role="presentation">
                                  <button style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0', width: '100%' }} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Friends</button>
                                </li>
                              </ul>

                              <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0"><MessagesList /></div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      : null
                    }
                  </div>
                  {cookies.auth ? <BottomNavbar /> : null}
                </>
              </BrowserRouter>
            </typingContext.Provider>
          </recentChatsContext.Provider>
        </postsContext.Provider>
      </onlineUsersContext.Provider>
    </CookiesProvider >
  );
}

export default App;
