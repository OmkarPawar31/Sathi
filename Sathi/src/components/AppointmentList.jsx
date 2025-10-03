import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageSquare, CheckCircle, XCircle, AlertCircle, MoreVertical } from 'lucide-react';

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Clinical Psychology",
    date: "2024-03-15",
    time: "2:00 PM",
    type: "video",
    status: "upcoming",
    reason: "Anxiety management session",
    fee: 1500,
    appointmentId: "APT-001"
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Sharma",
    specialty: "Psychiatrist",
    date: "2024-03-18",
    time: "11:00 AM",
    type: "audio",
    status: "upcoming",
    reason: "Medication review",
    fee: 2000,
    appointmentId: "APT-002"
  },
  {
    id: 3,
    doctor: "Dr. Priya Patel",
    specialty: "Counseling Psychology",
    date: "2024-03-20",
    time: "4:30 PM",
    type: "video",
    status: "upcoming",
    reason: "Relationship counseling",
    fee: 1200,
    appointmentId: "APT-003"
  },
  {
    id: 4,
    doctor: "Dr. Sarah Johnson",
    specialty: "Clinical Psychology",
    date: "2024-03-12",
    time: "3:00 PM",
    type: "video",
    status: "completed",
    reason: "Initial consultation",
    fee: 1500,
    appointmentId: "APT-004",
    notes: "Patient showed good progress in managing anxiety levels."
  },
  {
    id: 5,
    doctor: "Dr. Amit Kumar",
    specialty: "Child Psychology",
    date: "2024-03-10",
    time: "10:00 AM",
    type: "audio",
    status: "completed",
    reason: "Follow-up session",
    fee: 1800,
    appointmentId: "APT-005",
    notes: "Discussed coping strategies for school-related stress."
  },
  {
    id: 6,
    doctor: "Dr. Priya Patel",
    specialty: "Counseling Psychology",
    date: "2024-03-08",
    time: "2:15 PM",
    type: "chat",
    status: "cancelled",
    reason: "Family therapy session",
    fee: 1200,
    appointmentId: "APT-006",
    cancelReason: "Patient requested rescheduling"
  }
];

export default function AppointmentList() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (activeTab === 'upcoming') return appointment.status === 'upcoming';
    if (activeTab === 'completed') return appointment.status === 'completed';
    if (activeTab === 'cancelled') return appointment.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'status-upcoming';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return <AlertCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'audio': return <Phone size={16} />;
      case 'chat': return <MessageSquare size={16} />;
      default: return <Video size={16} />;
    }
  };

  const handleJoinSession = (appointment) => {
    alert(`Joining ${appointment.type} session with ${appointment.doctor}`);
  };

  const handleCancelAppointment = (appointment) => {
    if (window.confirm(`Are you sure you want to cancel your appointment with ${appointment.doctor}?`)) {
      alert('Appointment cancelled successfully. You will be refunded within 3-5 business days.');
    }
  };

  const handleReschedule = (appointment) => {
    alert(`Rescheduling appointment with ${appointment.doctor}. You will be redirected to the booking page.`);
  };

  return (
    <div className="appointment-list">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>Manage your upcoming, completed, and cancelled appointments</p>
      </div>

      <div className="appointments-tabs">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
          <span className="tab-count">
            {mockAppointments.filter(a => a.status === 'upcoming').length}
          </span>
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
          <span className="tab-count">
            {mockAppointments.filter(a => a.status === 'completed').length}
          </span>
        </button>
        <button
          className={`tab-button ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
          <span className="tab-count">
            {mockAppointments.filter(a => a.status === 'cancelled').length}
          </span>
        </button>
      </div>

      <div className="appointments-content">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} />
            <h3>No {activeTab} appointments</h3>
            <p>
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming appointments. Book a session with one of our doctors."
                : `No ${activeTab} appointments found.`
              }
            </p>
            {activeTab === 'upcoming' && (
              <button className="btn-primary">Book New Appointment</button>
            )}
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <div className="appointment-status">
                    <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <div className="appointment-id">#{appointment.appointmentId}</div>
                </div>

                <div className="appointment-body">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      <div className="avatar-placeholder">
                        {appointment.doctor.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="doctor-details">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                    </div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{appointment.time}</span>
                    </div>
                    
                    <div className="detail-item">
                      {getAppointmentTypeIcon(appointment.type)}
                      <span className="capitalize">{appointment.type} consultation</span>
                    </div>
                  </div>

                  <div className="appointment-reason">
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                  </div>

                  {appointment.notes && (
                    <div className="appointment-notes">
                      <p><strong>Notes:</strong> {appointment.notes}</p>
                    </div>
                  )}

                  {appointment.cancelReason && (
                    <div className="cancel-reason">
                      <p><strong>Cancellation reason:</strong> {appointment.cancelReason}</p>
                    </div>
                  )}

                  <div className="appointment-fee">
                    <span>Fee: ₹{appointment.fee}</span>
                  </div>
                </div>

                <div className="appointment-actions">
                  {appointment.status === 'upcoming' && (
                    <>
                      <button 
                        className="btn-primary"
                        onClick={() => handleJoinSession(appointment)}
                      >
                        Join Session
                      </button>
                      <button 
                        className="btn-outline"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="btn-danger"
                        onClick={() => handleCancelAppointment(appointment)}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {appointment.status === 'completed' && (
                    <>
                      <button className="btn-outline">
                        Download Receipt
                      </button>
                      <button className="btn-secondary">
                        Book Again
                      </button>
                    </>
                  )}

                  {appointment.status === 'cancelled' && (
                    <button className="btn-secondary">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}