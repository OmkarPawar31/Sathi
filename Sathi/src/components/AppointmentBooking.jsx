import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, IndianRupee, User, Phone, Mail, MessageSquare } from 'lucide-react';

export default function AppointmentBooking({ doctor, onBack }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('video');
  const [reason, setReason] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [urgency, setUrgency] = useState('routine');

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (assuming doctors don't work on Sundays)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          isToday: i === 0
        });
      }
    }
    
    return dates;
  };

  // Generate time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment.');
      return;
    }

    // Create appointment object
    const appointmentData = {
      doctor: doctor?.name || 'Selected Doctor',
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      reason,
      symptoms,
      urgency,
      fee: doctor?.consultationFee || 1500
    };

    console.log('Booking appointment:', appointmentData);
    alert('Appointment booked successfully! You will receive a confirmation shortly.');
    
    // In a real app, you would make an API call here
    onBack();
  };

  return (
    <div className="appointment-booking">
      <div className="booking-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Doctors
        </button>
        <h1>Book Appointment</h1>
      </div>

      {doctor && (
        <div className="selected-doctor">
          <div className="doctor-summary">
            <div className="doctor-avatar">
              <div className="avatar-placeholder">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <div className="fee-display">
                <IndianRupee size={16} />
                <span>{doctor.consultationFee} per session</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="booking-form" onSubmit={handleBookAppointment}>
        <div className="form-section">
          <h3><Calendar size={20} /> Select Date</h3>
          <div className="date-selector">
            {generateDates().map((date) => (
              <button
                key={date.value}
                type="button"
                className={`date-option ${selectedDate === date.value ? 'selected' : ''} ${date.isToday ? 'today' : ''}`}
                onClick={() => setSelectedDate(date.value)}
              >
                {date.label}
                {date.isToday && <span className="today-label">Today</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3><Clock size={20} /> Select Time</h3>
          <div className="time-selector">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Appointment Type</h3>
          <div className="appointment-types">
            <label className={`type-option ${appointmentType === 'video' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="appointmentType"
                value="video"
                checked={appointmentType === 'video'}
                onChange={(e) => setAppointmentType(e.target.value)}
              />
              <div className="type-content">
                <strong>Video Call</strong>
                <p>Online consultation via video call</p>
              </div>
            </label>

            <label className={`type-option ${appointmentType === 'audio' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="appointmentType"
                value="audio"
                checked={appointmentType === 'audio'}
                onChange={(e) => setAppointmentType(e.target.value)}
              />
              <div className="type-content">
                <strong>Audio Call</strong>
                <p>Voice-only consultation</p>
              </div>
            </label>

            <label className={`type-option ${appointmentType === 'chat' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="appointmentType"
                value="chat"
                checked={appointmentType === 'chat'}
                onChange={(e) => setAppointmentType(e.target.value)}
              />
              <div className="type-content">
                <strong>Text Chat</strong>
                <p>Secure messaging session</p>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Reason for Visit</h3>
          <textarea
            className="form-textarea"
            placeholder="Please describe the main reason for your appointment..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="form-section">
          <h3>Current Symptoms (Optional)</h3>
          <textarea
            className="form-textarea"
            placeholder="Describe any symptoms you're currently experiencing..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-section">
          <h3>Urgency Level</h3>
          <select
            className="form-select"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="routine">Routine Consultation</option>
            <option value="urgent">Urgent - Need to speak soon</option>
            <option value="emergency">Emergency - Need immediate help</option>
          </select>
        </div>

        <div className="booking-summary">
          <div className="summary-item">
            <span>Doctor:</span>
            <span>{doctor?.name || 'Selected Doctor'}</span>
          </div>
          <div className="summary-item">
            <span>Date:</span>
            <span>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Please select'}</span>
          </div>
          <div className="summary-item">
            <span>Time:</span>
            <span>{selectedTime || 'Please select'}</span>
          </div>
          <div className="summary-item">
            <span>Type:</span>
            <span className="capitalize">{appointmentType} consultation</span>
          </div>
          <div className="summary-item total">
            <span>Total Fee:</span>
            <span>
              <IndianRupee size={16} />
              {doctor?.consultationFee || 1500}
            </span>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-outline" onClick={onBack}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}