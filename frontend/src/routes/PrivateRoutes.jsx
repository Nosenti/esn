import { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
