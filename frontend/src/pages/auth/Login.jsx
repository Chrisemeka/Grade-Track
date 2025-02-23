import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafb] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Logo or Brand Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#1d8cd7] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e161b]">
            Welcome Back
          </h2>
          <p className="text-[#507a95] text-sm">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-[#0e161b] mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-[#0e161b] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#d1dde6] text-[#1d8cd7] focus:ring-[#1d8cd7]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#507a95]">
                Remember me
              </label>
            </div>

            <a 
              href="#" 
              className="text-sm font-medium text-[#1d8cd7] hover:text-[#1d8cd7]/80 transition duration-150"
            >
              Forgot password?
            </a>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1d8cd7] text-white py-2.5 px-4 rounded-xl font-semibold hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7] disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <p className="text-center text-sm text-[#507a95]">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-[#1d8cd7] hover:text-[#1d8cd7]/80 transition duration-150">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;