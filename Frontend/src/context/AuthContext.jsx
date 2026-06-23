import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, tokenStorage } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError]     = useState(null);
  const navigate              = useNavigate();


  useEffect(() => {
    const rehydrate = async () => {
     
      if (!tokenStorage.isValid()) {
        tokenStorage.remove(); 
        setLoading(false);
        return;
      }

      try {
        const { user: currentUser } = await authAPI.me();
        setUser(currentUser);
      } catch {
       
        tokenStorage.remove();
      } finally {
        setLoading(false);
      }
    };

    rehydrate();
  }, []);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    try {
      const { token, user: newUser } = await authAPI.register(name, email, password);
      tokenStorage.set(token);        
      setUser(newUser);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [navigate]);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const { token, user: loggedInUser } = await authAPI.login(email, password);
      tokenStorage.set(token);        
      setUser(loggedInUser);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
    
    } finally {
      tokenStorage.remove();         
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  const handleAuthError = useCallback(
    (error) => {
      if (
        error.status === 401 &&
        ['TOKEN_EXPIRED', 'INVALID_TOKEN', 'NO_TOKEN'].includes(error.code)
      ) {
        tokenStorage.remove();
        setUser(null);
        navigate('/login', {
          state: { message: 'Your session has expired. Please log in again.' },
        });
      }
    },
    [navigate]
  );

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    handleAuthError,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
