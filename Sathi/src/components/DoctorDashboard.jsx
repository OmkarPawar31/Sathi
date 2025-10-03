import React, { useState } from 'react';
import { Calendar, Clock, User, Heart, LogOut, Bell, Settings, Users, FileText, Activity, Search, Filter } from 'lucide-react';
import PatientCard from './PatientCard';
import AppointmentSchedule from './AppointmentSchedule';
import PatientDetails from './PatientDetails';
import './DoctorDashboard.css';

// Mock data for patients
const mockPatients = [
  {
    id: 1,
    name: "Omkar Sharma",
    age: 28,
    gender: "Male",
    email: "omkar@email.com",
    phone: "+91 98765 43210",
    avatar: "/api/placeholder/60/60",
    lastConsultation: "2024-03-12",
    nextAppointment: "2024-03-15",
    appointmentTime: "2:00 PM",
    consultationType: "video",
    condition: "Anxiety Management",
    severity: "moderate",
    notes: "Patient showing good progress in managing anxiety levels. Recommended continued therapy sessions.",
    medicalHistory: [
      { date: "2024-03-12", type: "Initial Consultation", notes: "First session - general anxiety assessment" },
      { date: "2024-03-05", type: "Follow-up", notes: "Discussed coping strategies, prescribed meditation" },
      { date: "2024-02-28", type: "Assessment", notes: "GAD-7 score: 12 (moderate anxiety)" }
    ],
    prescriptions: [
      { medication: "Sertraline", dosage: "50mg daily", prescribed: "2024-03-01", status: "active" }
    ],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      weight: "70 kg",
      height: "175 cm"
    }
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 34,
    gender: "Female",
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    avatar: "/api/placeholder/60/60",
    lastConsultation: "2024-03-10",
    nextAppointment: "2024-03-18",
    appointmentTime: "11:00 AM",
    consultationType: "audio",
    condition: "Depression",
    severity: "mild",
    notes: "Patient responding well to CBT sessions. Mood improvements noted over past month.",
    medicalHistory: [
      { date: "2024-03-10", type: "CBT Session", notes: "Worked on cognitive restructuring techniques" },
      { date: "2024-03-03", type: "Progress Review", notes: "PHQ-9 score improved from 14 to 8" },
      { date: "2024-02-25", type: "Initial Assessment", notes: "Mild depression with situational triggers" }
    ],
    prescriptions: [
      { medication: "Escitalopram", dosage: "10mg daily", prescribed: "2024-02-25", status: "active" }
    ],
    vitals: {
      bloodPressure: "115/75",
      heartRate: "68 bpm",
      weight: "58 kg",
      height: "162 cm"
    }
  },
  {
    id: 3,
    name: "Rahul Kumar",
    age: 22,
    gender: "Male",
    email: "rahul.k@email.com",
    phone: "+91 76543 21098",
    avatar: "/api/placeholder/60/60",
    lastConsultation: "2024-03-08",
    nextAppointment: "2024-03-20",
    appointmentTime: "4:30 PM",
    consultationType: "video",
    condition: "Social Anxiety",
    severity: "severe",
    notes: "Young adult struggling with social interactions. Implementing exposure therapy gradually.",
    medicalHistory: [
      { date: "2024-03-08", type: "Exposure Therapy", notes: "Practice social scenarios, homework assigned" },
      { date: "2024-03-01", type: "Assessment", notes: "Social Phobia Inventory score: 78 (severe)" },
      { date: "2024-02-22", type: "Initial Consultation", notes: "Social anxiety affecting academic performance" }
    ],
    prescriptions: [
      { medication: "Propranolol", dosage: "40mg as needed", prescribed: "2024-02-22", status: "active" }
    ],
    vitals: {
      bloodPressure: "118/76",
      heartRate: "76 bpm",
      weight: "65 kg",
      height: "170 cm"
    }
  },
  {
    id: 4,
    name: "Anita Singh",
    age: 45,
    gender: "Female",
    email: "anita.singh@email.com",
    phone: "+91 65432 10987",
    avatar: "/api/placeholder/60/60",
    lastConsultation: "2024-03-11",
    nextAppointment: "2024-03-19",
    appointmentTime: "3:15 PM",
    consultationType: "chat",
    condition: "Stress Management",
    severity: "mild",
    notes: "Working professional dealing with workplace stress. Good response to mindfulness techniques.",
    medicalHistory: [
      { date: "2024-03-11", type: "Stress Management", notes: "Taught progressive muscle relaxation" },
      { date: "2024-03-04", type: "Follow-up", notes: "Patient practicing daily meditation, stress levels reduced" },
      { date: "2024-02-26", type: "Initial Consultation", notes: "Work-related stress, sleep disturbances" }
    ],
    prescriptions: [],
    vitals: {
      bloodPressure: "125/82",
      heartRate: "70 bpm",
      weight: "62 kg",
      height: "158 cm"
    }
  },
  {
    id: 5,
    name: "Vikram Joshi",
    age: 31,
    gender: "Male",
    email: "vikram.joshi@email.com",
    phone: "+91 54321 09876",
    avatar: "/api/placeholder/60/60",
    lastConsultation: "2024-03-09",
    nextAppointment: null,
    appointmentTime: null,
    consultationType: null,
    condition: "Panic Disorder",
    severity: "moderate",
    notes: "Patient has completed initial treatment course. Monitoring for maintenance phase.",
    medicalHistory: [
      { date: "2024-03-09", type: "Progress Review", notes: "Panic attacks reduced from 5/week to 1/month" },
      { date: "2024-02-29", type: "CBT Session", notes: "Completed panic disorder CBT protocol" },
      { date: "2024-02-15", type: "Medication Review", notes: "Adjusted SSRI dosage, good tolerance" }
    ],
    prescriptions: [
      { medication: "Paroxetine", dosage: "20mg daily", prescribed: "2024-02-01", status: "active" }
    ],
    vitals: {
      bloodPressure: "122/78",
      heartRate: "74 bpm",
      weight: "78 kg",
      height: "180 cm"
    }
  }
];

export default function DoctorDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-details');
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
    setActiveTab('patients');
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCondition === 'all' || 
                         patient.condition.toLowerCase().includes(filterCondition.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const todayAppointments = mockPatients.filter(patient => 
    patient.nextAppointment === "2024-03-15"
  );

  const upcomingAppointments = mockPatients.filter(patient => 
    patient.nextAppointment && patient.nextAppointment > "2024-03-15"
  );

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Heart className="logo-icon" />
              <span className="logo-text">Sathi</span>
              <span className="doctor-badge">Doctor Portal</span>
            </div>
          </div>
          
          <div className="header-right">
            <button className="header-btn">
              <Bell size={20} />
              <span className="notification-count">3</span>
            </button>
            <button className="header-btn">
              <Settings size={20} />
            </button>
            <div className="user-profile">
              <img src="/api/placeholder/40/40" alt="Dr. Sarah Johnson" className="user-avatar" />
              <div className="user-info">
                <span className="user-name">Dr. Sarah Johnson</span>
                <span className="user-role">Clinical Psychologist</span>
              </div>
            </div>
            <button className="header-btn logout-btn" onClick={onLogout}>
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
              <Activity size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
            >
              <Users size={20} />
              <span>My Patients</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar size={20} />
              <span>Schedule</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Clock size={20} />
              <span>Appointments</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <FileText size={20} />
              <span>Reports</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="welcome-section">
                <h1>Good afternoon, Dr. Johnson!</h1>
                <p>You have {todayAppointments.length} appointments today and {upcomingAppointments.length} upcoming this week.</p>
              </div>

              <div className="quick-stats">
                <div className="stat-card patients">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{mockPatients.length}</h3>
                    <p>Total Patients</p>
                  </div>
                </div>
                <div className="stat-card appointments">
                  <div className="stat-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{todayAppointments.length}</h3>
                    <p>Today's Appointments</p>
                  </div>
                </div>
                <div className="stat-card upcoming">
                  <div className="stat-icon">
                    <Clock size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{upcomingAppointments.length}</h3>
                    <p>This Week</p>
                  </div>
                </div>
                <div className="stat-card consultation-hours">
                  <div className="stat-icon">
                    <Activity size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>24.5h</h3>
                    <p>This Month</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <section className="today-appointments">
                  <h2>Today's Appointments</h2>
                  <div className="appointments-list">
                    {todayAppointments.length === 0 ? (
                      <p className="no-appointments">No appointments scheduled for today</p>
                    ) : (
                      todayAppointments.map(patient => (
                        <div key={patient.id} className="appointment-item">
                          <div className="patient-avatar">
                            <div className="avatar-placeholder">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="appointment-info">
                            <h4>{patient.name}</h4>
                            <p>{patient.condition}</p>
                            <div className="appointment-time">
                              <Clock size={14} />
                              <span>{patient.appointmentTime}</span>
                            </div>
                          </div>
                          <div className="appointment-actions">
                            <button className="btn-outline-small">Reschedule</button>
                            <button className="btn-primary-small">Start Session</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section className="recent-patients">
                  <h2>Recent Patients</h2>
                  <div className="patients-preview">
                    {mockPatients.slice(0, 3).map(patient => (
                      <div key={patient.id} className="patient-preview-card">
                        <div className="patient-avatar">
                          <div className="avatar-placeholder">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="patient-info">
                          <h4>{patient.name}</h4>
                          <p>{patient.condition}</p>
                          <span className="last-seen">Last seen: {new Date(patient.lastConsultation).toLocaleDateString()}</span>
                        </div>
                        <button 
                          className="btn-secondary-small"
                          onClick={() => handlePatientSelect(patient)}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="patients-content">
              <div className="patients-header">
                <h1>My Patients</h1>
                <div className="patients-controls">
                  <div className="search-bar">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search patients by name or condition..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="filter-dropdown">
                    <Filter className="filter-icon" />
                    <select
                      value={filterCondition}
                      onChange={(e) => setFilterCondition(e.target.value)}
                    >
                      <option value="all">All Conditions</option>
                      <option value="anxiety">Anxiety</option>
                      <option value="depression">Depression</option>
                      <option value="stress">Stress</option>
                      <option value="panic">Panic Disorder</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="patients-grid">
                {filteredPatients.map(patient => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onSelect={handlePatientSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <AppointmentSchedule 
              appointments={mockPatients.filter(p => p.nextAppointment)}
            />
          )}

          {activeTab === 'patient-details' && selectedPatient && (
            <PatientDetails
              patient={selectedPatient}
              onBack={handleBackToPatients}
            />
          )}

          {activeTab === 'appointments' && (
            <div className="appointments-content">
              <h1>All Appointments</h1>
              <div className="appointments-overview">
                <div className="appointments-section">
                  <h2>Upcoming Appointments</h2>
                  <div className="appointments-list">
                    {mockPatients.filter(p => p.nextAppointment).map(patient => (
                      <div key={patient.id} className="appointment-card-full">
                        <div className="patient-info">
                          <div className="patient-avatar">
                            <div className="avatar-placeholder">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="info">
                            <h4>{patient.name}</h4>
                            <p>{patient.condition}</p>
                            <span className="severity severity-{patient.severity}">{patient.severity}</span>
                          </div>
                        </div>
                        <div className="appointment-details">
                          <div className="date-time">
                            <strong>{new Date(patient.nextAppointment).toLocaleDateString()}</strong>
                            <span>{patient.appointmentTime}</span>
                          </div>
                          <div className="consultation-type">
                            <span className="type-badge type-{patient.consultationType}">{patient.consultationType}</span>
                          </div>
                        </div>
                        <div className="appointment-actions">
                          <button className="btn-outline">Reschedule</button>
                          <button className="btn-primary">Start Session</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="reports-content">
              <h1>Reports & Analytics</h1>
              <div className="reports-grid">
                <div className="report-card">
                  <h3>Patient Progress Summary</h3>
                  <p>Monthly overview of patient improvements and treatment outcomes</p>
                  <button className="btn-primary">Generate Report</button>
                </div>
                <div className="report-card">
                  <h3>Consultation Statistics</h3>
                  <p>Analysis of consultation patterns and session effectiveness</p>
                  <button className="btn-primary">View Analytics</button>
                </div>
                <div className="report-card">
                  <h3>Treatment Plans</h3>
                  <p>Overview of active treatment plans and their progress</p>
                  <button className="btn-primary">Manage Plans</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}