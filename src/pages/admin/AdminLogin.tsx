import React, { useState, useEffect } from 'react';
import { Lock, Mail, AlertCircle, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { signInAdmin, getAdminUser } from '../../lib/supabase';
import { useRouter } from '../../router/Router';

export const AdminLogin: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // If already logged in, redirect to /admin immediately
  useEffect(() => {
    let isMounted = true;
    getAdminUser().then((user) => {
      if (isMounted) {
        if (user) {
          navigate('/admin');
        } else {
          setIsCheckingAuth(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await signInAdmin(email.trim(), password);
      navigate('/admin');
    } catch (err: unknown) {
      console.error('Login error:', err);
      const rawMsg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : '';

      const lower = rawMsg.toLowerCase();
      if (lower.includes('database error querying schema')) {
        setError(
          'Supabase schema mismatch: Please run "DELETE FROM auth.users WHERE email = \'' +
            email.trim() +
            '\';" in your Supabase SQL Editor, then create the user cleanly in Authentication -> Users with "Auto Confirm" turned ON.'
        );
      } else if (lower.includes('email not confirmed')) {
        setError(
          'Your admin account email is not confirmed yet. Run "UPDATE auth.users SET email_confirmed_at = now();" in your Supabase SQL Editor, or turn off "Confirm email" in Supabase Auth settings.'
        );
      } else if (lower.includes('invalid login credentials')) {
        setError(
          'Invalid login credentials. Make sure you have created this account in your Supabase Dashboard (Authentication -> Users) with "Auto Confirm" enabled.'
        );
      } else {
        setError(rawMsg || 'Invalid administrator credentials. Please check your email and password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f7',
        }}
      >
        <Loader2 size={32} className="spin-loader" color="var(--accent-primary)" />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-loader {
            animation: spin 0.9s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f7',
        padding: '24px 16px',
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      {/* Back button */}
      <div style={{ maxWidth: '420px', width: '100%', marginBottom: '18px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          <span>Return to D Care Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
          padding: '40px 32px',
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
            }}
          >
            <img
              src="/logo.png"
              alt="D Care Multi Speciality Dental Hospital Logo"
              style={{
                width: '76px',
                height: '76px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Hospital Admin Portal
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            D Care Multi Speciality Dental Hospital
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: '20px',
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.8125rem',
              lineHeight: 1.45,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600 }}>
              <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
            {error.toLowerCase().includes('invalid') && (
              <div style={{ fontSize: '0.75rem', color: '#7f1d1d', marginTop: '6px', paddingLeft: '24px' }}>
                <ul style={{ margin: 0, paddingLeft: '14px', lineHeight: 1.5 }}>
                  <li>Check for typos (e.g. number <strong>00</strong> vs letter <strong>oo</strong>).</li>
                  <li>Ensure user is created in <a href="https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/auth/users" target="_blank" rel="noreferrer" style={{ color: '#991b1b', fontWeight: 600, textDecoration: 'underline' }}>Supabase Auth</a> with <strong>Auto Confirm</strong> ON.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#1d1d1f',
                marginBottom: '8px',
              }}
            >
              Staff Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              >
                <Mail size={16} />
              </div>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                placeholder="affkhan63007@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#1d1d1f',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#1d1d1f',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              >
                <Lock size={16} />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#1d1d1f',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.9375rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.8 : 1,
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="spin-loader" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
          }}
        >
          Protected system. Authorized clinic personnel only.
          <br />
          All actions are authenticated and audited.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-loader {
          animation: spin 0.9s linear infinite;
        }
      `}</style>
    </div>
  );
};
