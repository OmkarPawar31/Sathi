// ... inside src/components/AuthPage.jsx
import React, { useState } from 'react';
import SignInForm from './SignInForm'; // Assumes forms are in the same directory
import SignUpForm from './SignUpForm'; // Assumes forms are in the same directory
import './AuthPage.css'; // Assumes CSS is in the src/ directory
// ... rest of the code

function AuthPage() {
  const [isSigningIn, setIsSigningIn] = useState(true); // true for SignIn, false for SignUp
  const [userType, setUserType] = useState('User'); // 'User' or 'Psychiatrist'

  const handleAuthSubmit = (formData) => {
    // 🚨 NOTE: In a real app, you would send this data to your backend API
    console.log(`Submitting as ${isSigningIn ? 'Sign In' : 'Sign Up'} for a ${userType}:`, formData);

    // Placeholder for API call and navigation logic
    // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) });
    alert(`Attempting to ${isSigningIn ? 'Sign In' : 'Sign Up'} as ${userType}. Check console for data.`);
  };

  const toggleForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1>{isSigningIn ? 'Welcome Back' : 'Join PsychatristConnect'}</h1>

        {/* User Type Selector */}
        <div className="user-type-selector">
          <button
            className={userType === 'User' ? 'active' : ''}
            onClick={() => setUserType('User')}
          >
            I'm a **User**
          </button>
          <button
            className={userType === 'Psychiatrist' ? 'active' : ''}
            onClick={() => setUserType('Psychiatrist')}
          >
            I'm a **Psychiatrist**
          </button>
        </div>
        
        {/* Render Form based on state */}
        {isSigningIn ? (
          <SignInForm onSubmit={handleAuthSubmit} userType={userType} />
        ) : (
          <SignUpForm onSubmit={handleAuthSubmit} userType={userType} />
        )}
        
        {/* Toggle link */}
        <p className="toggle-link">
          {isSigningIn ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleForm}>
            {isSigningIn ? ' **Sign Up**' : ' **Sign In**'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;