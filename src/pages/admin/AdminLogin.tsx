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
          'Supabase schema mismatch: Please run \"DELETE FROM auth.users WHERE email = \'' +
            email.trim() +
            '\';\" in your Supabase SQL Editor, then create the user cleanly in Authentication -> Users with \"Auto Confirm\" turned ON.'
        );
      } else if (lower.includes('email not confirmed')) {
        setError(
          'Your admin account email is not confirmed yet. Run \"UPDATE auth.users SET email_confirmed_at = now();\" in your Supabase SQL Editor, or turn off \"Confirm email\" in Supabase Auth settings.'
        );
      } else if (lower.includes('invalid login credentials')) {
        setError(
          'Invalid login credentials. Make sure you have created this account in your Supabase Dashboard (Authentication -> Users) with \"Auto Confirm\" enabled.'
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
        <Loader2 size={32} className=\"spin-loader\" color=\"var(--accent-primary)\" />
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
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif)',
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
              src=\"/logo.png\"
              alt=\"D Care Multi Speciality Dental Hospital Logo\"
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
            role=\"alert\"
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
              <AlertCircle size={16} color=\"#dc2626\" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
            {error.toLowerCase().includes('invalid') && (\n              <div style={{ fontSize: '0.75rem', color: '#7f1d1d', marginTop: '6px', paddingLeft: '24px' }}>\n                <ul style={{ margin: 0, paddingLeft: '14px', lineHeight: 1.5 }}>\n                  <li>Check for typos (e.g. number <strong>00</strong> vs letter <strong>oo</strong>).</li>\n                  <li>Ensure user is created in <a href=\"https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/auth/users\" target=\"_blank\" rel=\"noreferrer\" style={{ color: '#991b1b', fontWeight: 600, textDecoration: 'underline' }}>Supabase Auth</a> with <strong>Auto Confirm</strong> ON.</li>\n                </ul>\n              </div>\n            )}\n          </div>\n        )}\n\n        <form onSubmit={handleSubmit}>\n          {/* Email field */}\n          <div style={{ marginBottom: '18px' }}>\n            <label\n              htmlFor=\"admin-email\"\n              style={{\n                display: 'block',\n                fontSize: '0.8125rem',\n                fontWeight: 600,\n                color: '#1d1d1f',\n                marginBottom: '8px',\n              }}\n            >\n              Staff Email Address\n            </label>\n            <div style={{ position: 'relative' }}>\n              <div\n                style={{\n                  position: 'absolute',\n                  left: '14px',\n                  top: '50%',\n                  transform: 'translateY(-50%)',\n                  color: 'var(--text-muted)',\n                  pointerEvents: 'none',\n                }}\n              >\n                <Mail size={16} />\n              </div>\n              <input\n                id=\"admin-email\"\n                type=\"email\"\n                autoComplete=\"email\"\n                required\n                placeholder=\"affkhan63007@gmail.com\"\n                value={email}\n                onChange={(e) => setEmail(e.target.value)}\n                style={{\n                  width: '100%',\n                  padding: '12px 14px 12px 40px',\n                  borderRadius: '12px',\n                  border: '1px solid rgba(0, 0, 0, 0.12)',\n                  fontSize: '0.9375rem',\n                  outline: 'none',\n                  backgroundColor: '#ffffff',\n                  color: '#1d1d1f',\n                  boxSizing: 'border-box',\n                }}\n              />\n            </div>\n          </div>\n\n          {/* Password field */}\n          <div style={{ marginBottom: '24px' }}>\n            <label\n              htmlFor=\"admin-password\"\n              style={{\n                display: 'block',\n                fontSize: '0.8125rem',\n                fontWeight: 600,\n                color: '#1d1d1f',\n                marginBottom: '8px',\n              }}\n            >\n              Password\n            </label>\n            <div style={{ position: 'relative' }}>\n              <div\n                style={{\n                  position: 'absolute',\n                  left: '14px',\n                  top: '50%',\n                  transform: 'translateY(-50%)',\n                  color: 'var(--text-muted)',\n                  pointerEvents: 'none',\n                }}\n              >\n                <Lock size={16} />\n              </div>\n              <input\n                id=\"admin-password\"\n                type={showPassword ? 'text' : 'password'}\n                autoComplete=\"current-password\"\n                required\n                placeholder=\"••••••••••••\"\n                value={password}\n                onChange={(e) => setPassword(e.target.value)}\n                style={{\n                  width: '100%',\n                  padding: '12px 42px 12px 40px',\n                  borderRadius: '12px',\n                  border: '1px solid rgba(0, 0, 0, 0.12)',\n                  fontSize: '0.9375rem',\n                  outline: 'none',\n                  backgroundColor: '#ffffff',\n                  color: '#1d1d1f',\n                  boxSizing: 'border-box',\n                }}\n              />\n              <button\n                type=\"button\"\n                onClick={() => setShowPassword(!showPassword)}\n                aria-label={showPassword ? 'Hide password' : 'Show password'}\n                style={{\n                  position: 'absolute',\n                  right: '12px',\n                  top: '50%',\n                  transform: 'translateY(-50%)',\n                  background: 'none',\n                  border: 'none',\n                  color: 'var(--text-muted)',\n                  cursor: 'pointer',\n                  padding: '4px',\n                  display: 'flex',\n                  alignItems: 'center',\n                  justifyContent: 'center',\n                }}\n              >\n                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}\n              </button>\n            </div>\n          </div>\n\n          {/* Submit button */}\n          <button\n            type=\"submit\"\n            disabled={isSubmitting}\n            className=\"btn btn-primary\"\n            style={{\n              width: '100%',\n              padding: '14px',\n              fontSize: '0.9375rem',\n              fontWeight: 600,\n              display: 'flex',\n              alignItems: 'center',\n              justifyContent: 'center',\n              gap: '8px',\n              cursor: isSubmitting ? 'not-allowed' : 'pointer',\n              opacity: isSubmitting ? 0.8 : 1,\n            }}\n          >\n            {isSubmitting ? (\n              <>\n                <Loader2 size={16} className=\"spin-loader\" />\n                <span>Authenticating...</span>\n              </>\n            ) : (\n              <span>Sign In to Admin Portal</span>\n            )}\n          </button>\n        </form>\n\n        <div\n          style={{\n            marginTop: '24px',\n            textAlign: 'center',\n            fontSize: '0.75rem',\n            color: 'var(--text-muted)',\n            lineHeight: 1.5,\n          }}\n        >\n          Protected system. Authorized clinic personnel only.\n          <br />\n          All actions are authenticated and audited.\n        </div>\n      </div>\n\n      <style>{`\n        @keyframes spin {\n          from { transform: rotate(0deg); }\n          to { transform: rotate(360deg); }\n        }\n        .spin-loader {\n          animation: spin 0.9s linear infinite;\n        }\n      `}</style>\n    </div>\n  );\n};\n