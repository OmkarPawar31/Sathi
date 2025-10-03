import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Phone, Mail, User, Activity, FileText, Pill, AlertCircle, Edit, Save, Plus } from 'lucide-react';

export default function PatientDetails({ patient, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(patient.notes);
  const [newNote, setNewNote] = useState('');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'severity-mild';
      case 'moderate': return 'severity-moderate';
      case 'severe': return 'severity-severe';
      default: return 'severity-default';
    }
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    alert('Notes updated successfully!');
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      alert(`New note added: ${newNote}`);
      setNewNote('');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="patient-details">
      <div className="patient-details-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Patients
        </button>
        <div className="patient-header-info">
          <div className="patient-avatar-large">
            <div className="avatar-placeholder-large">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className={`severity-indicator-large ${getSeverityColor(patient.severity)}`}></div>
          </div>
          <div className="patient-title-info">
            <h1>{patient.name}</h1>
            <div className="patient-subtitle">
              <span>{patient.age} years old, {patient.gender}</span>
              <span className={`severity-badge ${getSeverityColor(patient.severity)}`}>
                {patient.severity} severity
              </span>
            </div>
            <p className="primary-condition">{patient.condition}</p>
          </div>
        </div>
        <div className="header-actions">
          {patient.nextAppointment && (
            <button className="btn-primary">
              <Clock size={16} />
              Start Session
            </button>
          )}
          <button className="btn-outline">
            <Calendar size={16} />
            Schedule Appointment
          </button>
        </div>
      </div>

      <div className="patient-details-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <User size={16} />
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FileText size={16} />
          Medical History
        </button>
        <button
          className={`tab ${activeTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          <Pill size={16} />
          Prescriptions
        </button>
        <button
          className={`tab ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          <Activity size={16} />
          Vitals & Stats
        </button>
      </div>

      <div className="patient-details-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-section contact-info">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{patient.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{patient.phone}</span>
                  </div>
                </div>
              </div>

              <div className="overview-section appointment-info">
                <h3>Next Appointment</h3>
                {patient.nextAppointment ? (
                  <div className="next-appointment-details">
                    <div className="appointment-date-time">
                      <Calendar size={16} />
                      <span>{formatDate(patient.nextAppointment)} at {patient.appointmentTime}</span>
                    </div>
                    <div className="appointment-type">
                      <span className="type-badge">
                        {patient.consultationType} consultation
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="no-appointment">No upcoming appointments</p>
                )}
              </div>

              <div className="overview-section vitals-summary">
                <h3>Latest Vitals</h3>
                <div className="vitals-grid">
                  <div className="vital-item">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{patient.vitals.bloodPressure}</span>
                  </div>
                  <div className="vital-item">
                    <span className="vital-label">Heart Rate</span>
                    <span className="vital-value">{patient.vitals.heartRate}</span>
                  </div>
                  <div className="vital-item">
                    <span className="vital-label">Weight</span>
                    <span className="vital-value">{patient.vitals.weight}</span>
                  </div>
                  <div className="vital-item">
                    <span className="vital-label">Height</span>
                    <span className="vital-value">{patient.vitals.height}</span>
                  </div>
                </div>
              </div>

              <div className="overview-section treatment-summary">
                <h3>Treatment Summary</h3>
                <div className="treatment-stats">
                  <div className="stat-item">
                    <span className="stat-value">{patient.medicalHistory.length}</span>
                    <span className="stat-label">Total Sessions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{patient.prescriptions.length}</span>
                    <span className="stat-label">Active Prescriptions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {Math.floor((new Date() - new Date(patient.medicalHistory[patient.medicalHistory.length - 1]?.date)) / (1000 * 60 * 60 * 24 * 30))}m
                    </span>
                    <span className="stat-label">Treatment Duration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="notes-section">
              <div className="notes-header">
                <h3>Clinical Notes</h3>
                <button 
                  className="btn-secondary-small"
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                >
                  {isEditingNotes ? <Save size={16} /> : <Edit size={16} />}
                  {isEditingNotes ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingNotes ? (
                <div className="notes-editor">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="notes-textarea"
                  />
                  <div className="editor-actions">
                    <button className="btn-outline" onClick={() => setIsEditingNotes(false)}>
                      Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSaveNotes}>
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="notes-display">
                  <p>{notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-content">
            <div className="history-header">
              <h3>Medical History</h3>
              <button className="btn-primary">
                <Plus size={16} />
                Add Entry
              </button>
            </div>
            <div className="history-timeline">
              {patient.medicalHistory.map((entry, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">
                    {formatDate(entry.date)}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{entry.type}</h4>
                    </div>
                    <p>{entry.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="prescriptions-content">
            <div className="prescriptions-header">
              <h3>Current Prescriptions</h3>
              <button className="btn-primary">
                <Plus size={16} />
                Add Prescription
              </button>
            </div>
            <div className="prescriptions-list">
              {patient.prescriptions.length > 0 ? (
                patient.prescriptions.map((prescription, index) => (
                  <div key={index} className="prescription-item">
                    <div className="prescription-info">
                      <h4>{prescription.medication}</h4>
                      <p className="dosage">{prescription.dosage}</p>
                      <span className="prescribed-date">
                        Prescribed: {formatDate(prescription.prescribed)}
                      </span>
                    </div>
                    <div className="prescription-status">
                      <span className={`status-badge status-${prescription.status}`}>
                        {prescription.status}
                      </span>
                    </div>
                    <div className="prescription-actions">
                      <button className="btn-outline-small">Modify</button>
                      <button className="btn-secondary-small">Renew</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-prescriptions">
                  <Pill size={48} />
                  <h4>No Active Prescriptions</h4>
                  <p>This patient has no current prescriptions.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="vitals-content">
            <div className="vitals-header">
              <h3>Vitals & Health Statistics</h3>
              <button className="btn-primary">
                <Plus size={16} />
                Record Vitals
              </button>
            </div>
            
            <div className="vitals-grid-detailed">
              <div className="vital-card">
                <div className="vital-icon">❤️</div>
                <div className="vital-details">
                  <h4>Blood Pressure</h4>
                  <div className="vital-value-large">{patient.vitals.bloodPressure}</div>
                  <span className="vital-status normal">Normal</span>
                </div>
              </div>
              
              <div className="vital-card">
                <div className="vital-icon">💓</div>
                <div className="vital-details">
                  <h4>Heart Rate</h4>
                  <div className="vital-value-large">{patient.vitals.heartRate}</div>
                  <span className="vital-status normal">Normal</span>
                </div>
              </div>
              
              <div className="vital-card">
                <div className="vital-icon">⚖️</div>
                <div className="vital-details">
                  <h4>Weight</h4>
                  <div className="vital-value-large">{patient.vitals.weight}</div>
                  <span className="vital-status normal">Stable</span>
                </div>
              </div>
              
              <div className="vital-card">
                <div className="vital-icon">📏</div>
                <div className="vital-details">
                  <h4>Height</h4>
                  <div className="vital-value-large">{patient.vitals.height}</div>
                  <span className="vital-status">-</span>
                </div>
              </div>
            </div>

            <div className="health-metrics">
              <h4>Mental Health Metrics</h4>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">Anxiety Level (GAD-7)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '60%'}}></div>
                  </div>
                  <span className="metric-value">12/21</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Depression (PHQ-9)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '40%'}}></div>
                  </div>
                  <span className="metric-value">8/27</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Stress Level</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="metric-value">6/10</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="quick-actions-panel">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-action">
            <Calendar size={20} />
            <span>Schedule Follow-up</span>
          </button>
          <button className="quick-action">
            <FileText size={20} />
            <span>Generate Report</span>
          </button>
          <button className="quick-action">
            <Mail size={20} />
            <span>Send Message</span>
          </button>
          <button className="quick-action">
            <Pill size={20} />
            <span>Prescribe Medication</span>
          </button>
        </div>
      </div>
    </div>
  );
}