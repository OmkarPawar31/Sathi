import React, { useState } from 'react';
import Homepage  from './home.jsx';  


function SignInForm({ onSubmit, userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }
    
    // Pass the form data up to the parent component
    onSubmit({ 
      email, 
      password, 
      userType 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In as {userType}</h2>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default  SignInForm;