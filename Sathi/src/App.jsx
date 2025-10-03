import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Homepage from './components/home';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'home', 'dashboard'
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    if (userData.userType === 'User') {
      setCurrentView('patient-dashboard');
    } else if (userData.userType === 'Psychiatrist') {
      setCurrentView('doctor-dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  const handleGoToDashboard = () => {
    if (user?.userType === 'User') {
      setCurrentView('patient-dashboard');
    } else if (user?.userType === 'Psychiatrist') {
      setCurrentView('doctor-dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('auth');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Homepage onGoToDashboard={handleGoToDashboard} />;
      case 'patient-dashboard':
        return <PatientDashboard user={user} onLogout={handleLogout} />;
      case 'doctor-dashboard':
        return <DoctorDashboard user={user} onLogout={handleLogout} />;
      case 'auth':
      default:
        return <AuthPage onAuthSuccess={handleAuthSuccess} onGoHome={handleGoHome} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;
