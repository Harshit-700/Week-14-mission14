import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, error, clearError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting]   = useState(false);


  const flashMessage = location.state?.message;
  const redirectTo   = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (!loading && isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, loading, navigate, redirectTo]);

  useEffect(() => { return () => clearError(); }, [clearError]);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required.';
    if (!form.password) errs.password = 'Password is required.';
    return errs;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: undefined }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setSubmitting(true);
    await login(form.email.toLowerCase(), form.password);
    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🔐</div>
          <h1>Welcome back</h1>
          <p>Sign in to continue</p>
        </div>

    
        {flashMessage && (
          <div className="alert alert-info" role="status">
            <span>ℹ</span> {flashMessage}
          </div>
        )}

        {error && (
          <div className="alert alert-error" role="alert">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              value={form.email} onChange={handleChange}
              placeholder="jane@example.com"
              className={fieldErrors.email ? 'input-error' : ''}
              disabled={submitting}
              autoFocus
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              placeholder="Your password"
              className={fieldErrors.password ? 'input-error' : ''}
              disabled={submitting}
            />
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
