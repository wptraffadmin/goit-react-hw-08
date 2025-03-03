import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/slice';

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children — рендерабельний вміст, обов’язковий
  redirectTo: PropTypes.string, // redirectTo — рядок, необов’язковий
};