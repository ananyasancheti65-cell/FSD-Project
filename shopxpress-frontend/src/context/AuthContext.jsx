import { createContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../services/auth';
import { showToast } from '../components/Toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopxpress_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('shopxpress_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('shopxpress_theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const persistAuth = (data) => {
    localStorage.setItem('shopxpress_token', data.token);
    localStorage.setItem('shopxpress_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      persistAuth(response.data);
      showToast('Welcome back!', 'success');
      return response;
    } catch (error) {
      showToast(error?.response?.data?.message || 'Login failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload) => {
    setLoading(true);
    try {
      const response = await registerUser(payload);
      persistAuth(response.data);
      showToast('Account created successfully', 'success');
      return response;
    } catch (error) {
      showToast(error?.response?.data?.message || 'Signup failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('shopxpress_token');
    localStorage.removeItem('shopxpress_user');
    setUser(null);
    setToken(null);
    showToast('Logged out', 'info');
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('shopxpress_theme', isDark ? 'dark' : 'light');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, signup: handleSignup, logout, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};
