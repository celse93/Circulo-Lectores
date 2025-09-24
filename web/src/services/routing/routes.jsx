import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Book } from '../../pages/Book';
import { Quote } from '../../pages/Quote';
import { Feed } from '../../pages/Feed';
import { Profile } from '../../pages/Profile';
import { Register } from '../../pages/Register';
import { ReviewForm } from '../../pages/ReviewForm';
import { Footer } from '../../components/Footer';
import { ReviewCard } from '../../components/ReviewCard';
import { UserCard } from '../../components/UserCard';
import { Author } from '../../pages/Author';

export const routesConfig = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
  },
  {
    name: 'Book Detail',
    path: '/book',
    component: <Book />,
  },
  {
    name: 'Profile',
    path: '/profile',
    component: <Profile />,
  },
  {
    name: 'Quotes',
    path: '/quotes',
    component: <Quote />,
  },
  {
    name: 'Feed',
    path: '/feed',
    component: <Feed />,
  },
  {
    name: 'Register',
    path: '/register',
    component: <Register />,
  },
  {
    name: 'Review Form',
    path: '/review_form',
    component: <ReviewForm />,
  },
  {
    name: 'Footer',
    path: '/footer',
    component: <Footer />,
  },
  {
    name: 'Auhtor',
    path: '/auhtor',
    component: <Author />,
  },
  {
    name: 'ReviewCard',
    path: '/review_card',
    component: <ReviewCard />,
  },
  {
    name: 'User Card',
    path: '/user_card',
    component: <UserCard />,
  },
  {
    name: 'NotFound',
    path: '*',
    component: <Login />,
  },
];
