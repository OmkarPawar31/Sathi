import React, { useState } from 'react';

function SignUpForm({ onSubmit, userType }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Specific field for Psychiatrists
  const [licenseNumber, setLicenseNumber] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const formData = { 
      name, 
      email, 
      password, 
      userType 
    };

    // Add specific field for Psychiatrists
    if (userType === 'Psychiatrist') {
      if (!licenseNumber) {
        alert('Psychiatrists must enter a license number.');
        return;
      }
      formData.licenseNumber = licenseNumber;
    }
    
    // Pass the form data up to the parent component
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Create an Account as {userType}</h2>
      
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {/* Conditional Field for Psychiatrists */}
      {userType === 'Psychiatrist' && (
        <input
          type="text"
          placeholder="Medical License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
      )}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;