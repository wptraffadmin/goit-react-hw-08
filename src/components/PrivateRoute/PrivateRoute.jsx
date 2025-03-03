import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/slice';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children може бути будь-яким рендерабельним вмістом
  redirectTo: PropTypes.string, // redirectTo — рядок, необов’язковий (має дефолтне значення)
};