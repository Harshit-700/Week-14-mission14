import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tokenStorage } from '../api/client';


const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Verifying session…</p>
      </div>
    );
  }


  if (!isAuthenticated || !tokenStorage.isValid()) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: 'Please log in to access this page.',
        }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
