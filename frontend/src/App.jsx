import { Routes, Route } from 'react-router';
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
  const { data } = useQuery({
    queryKey: ['dodos'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/checkAuth');
      return res.data;
    },
    retry: false,
  });

  console.log(data);

  return (
    <div className="h-screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/call' element={<CallPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
