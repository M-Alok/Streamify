import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './lib/axios';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';


const App = () => {
  const { data:authData } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/checkAuth');
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;

  return (
    <div className="h-screen">
      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to='/login' /> } />
        <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to='/' /> } />
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to='/' /> } />
        <Route path='/onboarding' element={ authUser ? <OnboardingPage /> : <Navigate to='/login' /> } />
        <Route path='/notifications' element={ authUser ? <NotificationsPage /> : <Navigate to='/login' /> } />
        <Route path='/chat' element={ authUser ? <ChatPage /> : <Navigate to='/login' /> } />
        <Route path='/call' element={ authUser ? <CallPage /> : <Navigate to='/login' /> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
