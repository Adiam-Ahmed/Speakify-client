import './App.scss';
import { useState } from 'react';
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

  const [loginTimestamp, setLoginTimestamp] = useState(null);

  const handleLoginHeader = () => {
    const newTimestamp = Date.now();
    setLoginTimestamp(newTimestamp);
  };

  return (
    <BrowserRouter>
      <Header loginTimestamp={loginTimestamp} />
      <Routes>
        <Route path='/' element={<LandingPage  />} />
        <Route path='/login' element={<GoogleOAuthProvider clientId={clientId}><Login handleLoginHeader={handleLoginHeader} /></GoogleOAuthProvider>} />
        <Route path='/signup' element={<GoogleOAuthProvider clientId={clientId}><Register /></GoogleOAuthProvider>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/speakify' element={<SpeakifyPage />} />
        <Route path="/profile/book/:bookId" element={<BookPage />} />  
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;