import Home from '@/routes/Login';
const Chat = () => import('@/routes/Chat');


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
];

export default routes;
