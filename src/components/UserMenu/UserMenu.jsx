import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/slice';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};