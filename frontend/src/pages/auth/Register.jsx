import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            Create your account
          </h2>
          <p className="text-[#507a95] text-sm">
            Join us today and start your journey
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-[#0e161b] mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                  placeholder="John"
                />
              </div>

              <div>
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-medium text-[#0e161b] mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                  placeholder="Doe"
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label 
                htmlFor="role" 
                className="block text-sm font-medium text-[#0e161b] mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150 bg-white"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="parent">Parent</option>
              </select>
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
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-[#0e161b] mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7] transition duration-150"
                placeholder="••••••••"
              />
            </div>
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
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>

            <p className="text-center text-sm text-[#507a95]">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-[#1d8cd7] hover:text-[#1d8cd7]/80 transition duration-150">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;