import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/Header/Header";
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BookPage from './pages/BookPage';
import SpeakifyPage from './pages/SpeakifyPage';
const clientId = process.env.REACT_APP_ClientID;


function App() {
  const [theme, setTheme] = useState('light');
  const [loginTimestamp, setLoginTimestamp] = useState(null);
  const [userId, setUserId] = useState(); 


  const handleLoginHeader = () => {
    const newTimestamp = Date.now();
    setLoginTimestamp(newTimestamp);
  };

  // const handleUserInfoLoaded = (id) => {
  //   setUserId(id); 
  // }




  useEffect(() => {
    const newThemeData = JSON.parse(localStorage.getItem('newThemeLocalStorage'))
    if (newThemeData) {
      setTheme(newThemeData)
    }
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    localStorage.setItem('newThemeLocalStorage', JSON.stringify(newTheme))
  };
  return (
    <BrowserRouter>
      <div data-theme={`${theme}`}>
        <Header loginTimestamp={loginTimestamp} handleThemeToggle={handleThemeToggle} theme ={theme}/>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<GoogleOAuthProvider clientId={clientId}><Login handleLoginHeader={handleLoginHeader}  /></GoogleOAuthProvider>} />
          <Route path='/signup' element={<GoogleOAuthProvider clientId={clientId}><Register/></GoogleOAuthProvider>} />
          <Route path='/profile' element={<Profile  />} />
          <Route path='/profile/speakify' element={<SpeakifyPage  />} />
          <Route path="/profile/book/:bookId" element={<BookPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;