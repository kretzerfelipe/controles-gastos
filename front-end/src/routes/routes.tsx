import { createBrowserRouter } from 'react-router';
import { PublicLayout } from './public-layout';
import { Home } from '@/pages/home';
import { Login } from '@/pages/login';
import { Signup } from '@/pages/signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicLayout />
    ),
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  {
    path: '/login',
    element: (
      <Login />
    ),
  },
  {
    path: '/signup',
    element: (
      <Signup />
    ),
  }
])