// Main patient dashboard - took me forever to get this layout right!
import React, { useState } from 'react';
import { Calendar, Clock, User, Heart, LogOut, Bell, Settings, Plus, Search } from 'lucide-react';
import DoctorCard from './DoctorCard';
import AppointmentBooking from './AppointmentBooking';
import AppointmentList from './AppointmentList';
import './PatientDashboard.css';

// TODO: Replace with actual API calls when backend is ready
// Mock data for doctors - using this for now to test the UI
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychology",
    experience: "8 years",
    rating: 4.9,
    image: "/api/placeholder/100/100",
    location: "Mumbai, Maharashtra",
    languages: ["English", "Hindi", "Marathi"],
    about: "Specializing in anxiety, depression, and trauma therapy using CBT and mindfulness approaches.",
    availability: "Mon-Fri: 9:00 AM - 6:00 PM",
    consultationFee: 1500,
    nextAvailable: "Today, 2:00 PM"
  },
  {
    id: 2,
    name: "Dr. Rajesh Sharma",
    specialty: "Psychiatrist",
    experience: "12 years",
    rating: 4.8,
    image: "/api/placeholder/100/100",
    location: "Pune, Maharashtra",
    languages: ["English", "Hindi"],
    about: "Expert in mood disorders, bipolar disorder, and medication management.",
    availability: "Mon-Sat: 10:00 AM - 8:00 PM",
    consultationFee: 2000,
    nextAvailable: "Tomorrow, 11:00 AM"
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialty: "Counseling Psychology",
    experience: "6 years",
    rating: 4.7,
    image: "/api/placeholder/100/100",
    location: "Mumbai, Maharashtra",
    languages: ["English", "Hindi", "Gujarati"],
    about: "Focus on relationship counseling, family therapy, and stress management.",
    availability: "Tue-Sun: 11:00 AM - 7:00 PM",
    consultationFee: 1200,
    nextAvailable: "Today, 4:30 PM"
  },
  {
    id: 4,
    name: "Dr. Amit Kumar",
    specialty: "Child Psychology",
    experience: "10 years",
    rating: 4.9,
    image: "/api/placeholder/100/100",
    location: "Nashik, Maharashtra",
    languages: ["English", "Hindi"],
    about: "Specialized in childhood behavioral issues, ADHD, and developmental disorders.",
    availability: "Mon-Fri: 8:00 AM - 5:00 PM",
    consultationFee: 1800,
    nextAvailable: "Tomorrow, 9:00 AM"
  }
];


function onLogout(redirectPath) {
  window.location.href = redirectPath;
}
export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useState({ name: "Omkar", avatar: "/api/placeholder/40/40" });

  const handleBookAppointment = (doctor) => {
    // console.log('Booking appointment with:', doctor.name); // keeping this for debugging
    setSelectedDoctor(doctor);
    setActiveTab('book-appointment');
  };

  const handleBackToDashboard = () => {
    setSelectedDoctor(null);
    setActiveTab('dashboard');
  };

  const filteredDoctors = mockDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="patient-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Heart className="logo-icon" />
              <span className="logo-text">Sathi</span>
            </div>
          </div>
          
          <div className="header-right">
            <button className="header-btn">
              <Bell size={20} />
            </button>
            <button className="header-btn">
              <Settings size={20} />
            </button>
            <div className="user-profile">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
            </div>
            <button className="header-btn logout-btn" onClick={() => onLogout('/AuthPage.jsx')}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <User size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'find-doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('find-doctors')}
            >
              <Search size={20} />
              <span>Find Doctors</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar size={20} />
              <span>My Appointments</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'book-appointment' ? 'active' : ''}`}
              onClick={() => setActiveTab('book-appointment')}
            >
              <Plus size={20} />
              <span>Book Appointment</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="welcome-section">
                <h1>Welcome back, {user.name}!</h1>
                <p>How are you feeling today? Let's take care of your mental health together.</p>
              </div>

              <div className="quick-stats">
                <div className="stat-card">
                  <Calendar className="stat-icon" />
                  <div className="stat-info">
                    <h3>3</h3>
                    <p>Upcoming Appointments</p>
                  </div>
                </div>
                <div className="stat-card">
                  <Clock className="stat-icon" />
                  <div className="stat-info">
                    <h3>12</h3>
                    <p>Total Sessions</p>
                  </div>
                </div>
                <div className="stat-card">
                  <Heart className="stat-icon" />
                  <div className="stat-info">
                    <h3>85%</h3>
                    <p>Wellness Score</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <section className="next-appointment">
                  <h2>Next Appointment</h2>
                  <div className="appointment-card">
                    <div className="appointment-info">
                      <h3>Dr. Sarah Johnson</h3>
                      <p>Clinical Psychology Session</p>
                      <div className="appointment-time">
                        <Calendar size={16} />
                        <span>Today, March 15, 2024 at 2:00 PM</span>
                      </div>
                    </div>
                    <button className="btn-primary">Join Session</button>
                  </div>
                </section>

                <section className="recommended-doctors">
                  <h2>Recommended Doctors</h2>
                  <div className="doctors-grid">
                    {mockDoctors.slice(0, 2).map(doctor => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onBookAppointment={handleBookAppointment}
                        compact={true}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'find-doctors' && (
            <div className="find-doctors-content">
              <div className="search-section">
                <h1>Find Your Perfect Mental Health Professional</h1>
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, specialty, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="doctors-list">
                {filteredDoctors.map(doctor => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <AppointmentList />
          )}

          {activeTab === 'book-appointment' && (
            <AppointmentBooking
              doctor={selectedDoctor}
              onBack={handleBackToDashboard}
            />
          )}
        </main>
      </div>
    </div>
  );
}