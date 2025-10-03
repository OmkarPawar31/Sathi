import React from 'react';
import { Calendar, Clock, Phone, Mail, AlertCircle, CheckCircle, User, Activity } from 'lucide-react';

export default function PatientCard({ patient, onSelect }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'severity-mild';
      case 'moderate': return 'severity-moderate';
      case 'severe': return 'severity-severe';
      default: return 'severity-default';
    }
  };

  const getStatusIcon = (nextAppointment) => {
    if (nextAppointment) {
      const appointmentDate = new Date(nextAppointment);
      const today = new Date();
      const isToday = appointmentDate.toDateString() === today.toDateString();
      
      if (isToday) {
        return <AlertCircle size={16} className="status-today" />;
      } else {
        return <Calendar size={16} className="status-scheduled" />;
      }
    } else {
      return <CheckCircle size={16} className="status-completed" />;
    }
  };

  const getConsultationTypeIcon = (type) => {
    switch (type) {
      case 'video': return '📹';
      case 'audio': return '🎧';
      case 'chat': return '💬';
      default: return '📋';
    }
  };

  return (
    <div className="patient-card" onClick={() => onSelect(patient)}>
      <div className="patient-card-header">
        <div className="patient-avatar">
          <div className="avatar-placeholder">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className={`severity-indicator ${getSeverityColor(patient.severity)}`}></div>
        </div>
        
        <div className="patient-basic-info">
          <h3>{patient.name}</h3>
          <div className="patient-meta">
            <span className="age-gender">{patient.age}y, {patient.gender}</span>
            <span className={`severity-badge ${getSeverityColor(patient.severity)}`}>
              {patient.severity}
            </span>
          </div>
          <p className="condition">{patient.condition}</p>
        </div>

        <div className="patient-status">
          {getStatusIcon(patient.nextAppointment)}
        </div>
      </div>

      <div className="patient-card-body">
        <div className="patient-notes">
          <p>{patient.notes}</p>
        </div>

        <div className="patient-vitals-quick">
          <div className="vital-item">
            <span className="vital-label">BP:</span>
            <span className="vital-value">{patient.vitals.bloodPressure}</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">HR:</span>
            <span className="vital-value">{patient.vitals.heartRate}</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">Weight:</span>
            <span className="vital-value">{patient.vitals.weight}</span>
          </div>
        </div>

        <div className="patient-history-summary">
          <div className="history-item">
            <Calendar size={14} />
            <span>Last seen: {new Date(patient.lastConsultation).toLocaleDateString()}</span>
          </div>
          <div className="history-item">
            <Activity size={14} />
            <span>{patient.medicalHistory.length} sessions completed</span>
          </div>
        </div>

        {patient.nextAppointment && (
          <div className="next-appointment">
            <div className="appointment-info">
              <Clock size={16} />
              <div className="appointment-details">
                <span className="appointment-date">
                  {new Date(patient.nextAppointment).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="appointment-time">{patient.appointmentTime}</span>
              </div>
              <span className="consultation-type">
                {getConsultationTypeIcon(patient.consultationType)}
              </span>
            </div>
          </div>
        )}

        {patient.prescriptions.length > 0 && (
          <div className="prescription-indicator">
            <span className="prescription-count">
              {patient.prescriptions.length} active prescription{patient.prescriptions.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <div className="patient-card-footer">
        <div className="contact-info">
          <div className="contact-item">
            <Mail size={14} />
            <span>{patient.email}</span>
          </div>
          <div className="contact-item">
            <Phone size={14} />
            <span>{patient.phone}</span>
          </div>
        </div>
        
        <div className="patient-actions">
          {patient.nextAppointment ? (
            <>
              <button 
                className="btn-outline-small"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Rescheduling appointment...');
                }}
              >
                Reschedule
              </button>
              <button 
                className="btn-primary-small"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Starting ${patient.consultationType} session with ${patient.name}`);
                }}
              >
                Start Session
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-secondary-small"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Opening messaging...');
                }}
              >
                Message
              </button>
              <button 
                className="btn-primary-small"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Scheduling new appointment...');
                }}
              >
                Schedule
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}