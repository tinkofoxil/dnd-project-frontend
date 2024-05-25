import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const LogoutButton = () => {
  const history = useNavigate();

  const Logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('user_id'); // удалить токен из localStorage
    history('/'); // перенаправить пользователя на страницу входа
    window.location.reload();
  };

  return (
    <Button variant="outline-danger" onClick={Logout}>Выход из аккаунта</Button>
  );
};

export default LogoutButton;