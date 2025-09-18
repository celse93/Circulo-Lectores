import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Book } from '../../pages/BookDetail';
import { Quote } from '../../pages/Quote';
import { Feed } from '../../pages/Feed';
import { Profile } from '../../pages/Profile';
import { Register } from '../../pages/Register';
import { ReviewForm } from '../../pages/ReviewForm';
import { ReviewPage } from '../../pages/ReviewsPage';
import { BookCard } from '../../components/BookCard';
import { Footer } from '../../components/Footer';
import { ProgressBar } from '../../components/ProgressBar';
import { ReviewCard } from '../../components/ReviewCard';
import { SplashScreen } from '../../components/SplashScreen';
import { UserCard } from '../../components/UserCard';
import { BookSearch } from '../../pages/BookSearch';

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
    name: 'Book',
    path: '/books',
    component: <Book />,
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
    name: 'ReviewForm',
    path: '/review_form',
    component: <ReviewForm />,
  },
  {
    name: 'ReviewPage',
    path: '/review_page',
    component: <ReviewPage />,
  },
  {
    name: 'BookCard',
    path: '/book_card',
    component: <BookCard />,
  },
  {
    name: 'Footer',
    path: '/footer',
    component: <Footer />,
  },
  {
    name: 'ProgressBar',
    path: '/progress_bar',
    component: <ProgressBar />,
  },
  {
    name: 'ReviewCard',
    path: '/review_card',
    component: <ReviewCard />,
  },
  {
    name: 'SplashScreen',
    path: '/splash_screen',
    component: <SplashScreen />,
  },
  {
    name: 'UserCard',
    path: '/user_card',
    component: <UserCard />,
  },
  {
    name: 'BookSearch',
    path: '/book_search',
    component: <BookSearch />,
  },
  {
    name: 'All',
    path: '*',
    component: <Home />,
  },
];
