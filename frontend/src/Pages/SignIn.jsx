import { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Test credentials
const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'test123'
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Form validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Check against test credentials
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setSuccess('Signed in successfully!');
        navigate('/');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">You are logged in as {TEST_CREDENTIALS.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="w-full max-w-md m-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">Reps & Recipes</h1>
          <p className="text-gray-600">Order Healthy food in minutes</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium text-orange-800 mb-2">Test Credentials:</h3>
          <p className="text-sm text-orange-700">Email: {TEST_CREDENTIALS.email}</p>
          <p className="text-sm text-orange-700">Password: {TEST_CREDENTIALS.password}</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder={isSignUp ? 'Create a password (min. 6 characters)' : 'Enter your password'}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
              </button>
            </div>
            
            {!isSignUp && (
              <div className="text-right mt-2">
                <button className="text-sm text-orange-500 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transform hover:scale-[1.02] transition-all flex items-center justify-center font-medium"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <>
                {isSignUp ? (
                  <>
                    <UserPlus size={20} className="mr-2" />
                    Sign Up
                  </>
                ) : (
                  <>
                    <LogIn size={20} className="mr-2" />
                    Sign In
                  </>
                )}
              </>
            )}
          </button>
        </div>

        <div className="text-center mt-6">
          {isSignUp ? (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-orange-500 font-medium hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-orange-500 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}