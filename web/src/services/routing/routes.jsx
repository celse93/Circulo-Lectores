import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { BookDetail } from '../../pages/BookDetail';
import { Quote } from '../../pages/Quote';
import { Feed } from '../../pages/Feed';
import { Profile } from '../../pages/Profile';
import { Register } from '../../pages/Register';
import { ReviewForm } from '../../pages/ReviewForm';
import { Footer } from '../../components/Footer';
import { SplashScreen } from '../../components/SplashScreen';
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
    component: <BookDetail />,
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
    name: 'Profile',
    path: '/profile',
    component: <Profile />,
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
    name: 'Splash Screen',
    path: '/splash_screen',
    component: <SplashScreen />,
  },
  {
    name: 'Auhtor',
    path: '/auhtor',
    component: <Author />,
  },
  {
    name: 'User Card',
    path: '/user_card',
    component: <UserCard />,
  },
  {
    name: 'All',
    path: '*',
    component: <Home />,
  },
];
