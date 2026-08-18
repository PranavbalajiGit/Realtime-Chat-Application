import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '@heroui/react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { WallpaperProvider } from './context/WallpaperContext.jsx';
import { Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  return ( 
  <ThemeProvider>
    <WallpaperProvider>
        <Routes>
          <Route path = "/" element = { <ChatPage/> }/>
          <Route path = "/auth" element = { <AuthPage/> }/>
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App
