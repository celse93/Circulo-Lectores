import { CreatePosts } from '../components/CreatePosts';
import { Feed } from '../components/Feed';

export const Home = () => {
  return (
    <div className="container-fluid min-vh-100 mt-5 pt-5">
      <CreatePosts />
      <Feed />
    </div>
  );
};
