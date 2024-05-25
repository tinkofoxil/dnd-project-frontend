import Header from './components/Header';
import Footer from './components/Footer';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import About from './components/About';
import Main from './components/Main';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Account from './components/Account';
import UserAccount from './components/UserAccount';
import ProfileCreate from './components/ProfileCreate';
import ProfileEdit from './components/ProfileEdit';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import GameSessionsList from './components/GameSessionsList';
import GameSession from './components/GameSession';
import PlayerActions from './components/PlayerActions';
import PrivateRoute from './components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import RegistrationSuccess from './components/users/RegistrationSuccess';

function App() {
  return (
    <div>
      <Header />
      <div className="dark-theme">
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/profiles" element={<Profiles />}/>
          <Route path="/profiles/:id" element={<Profile />}/>
          <Route path="/profiles/:id/edit" element={<ProfileEdit />}/>
          <Route path="/games" element={<GameList />}/>
          <Route path="/games/:gameId" element={<GameDetail />}/>
          <Route path="/sessions/:sessionId" element={<GameSession />}/>
          <Route path="/sessions/:sessionId/actions" element={<PlayerActions />}/>
          <Route path="/profile_create" element={<PrivateRoute component={ProfileCreate} />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/register/success" element={<RegistrationSuccess />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/account/:id" element={<UserAccount />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
