import React from 'react';
import { Star, MapPin, Clock, Calendar, IndianRupee, Languages } from 'lucide-react';

export default function DoctorCard({ doctor, onBookAppointment, compact = false }) {
  if (compact) {
    return (
      <div className="doctor-card compact">
        <div className="doctor-avatar">
          <div className="avatar-placeholder">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p className="specialty">{doctor.specialty}</p>
          <div className="rating">
            <Star className="star-icon filled" size={14} />
            <span>{doctor.rating}</span>
          </div>
        </div>
        <button 
          className="btn-secondary"
          onClick={() => onBookAppointment(doctor)}
        >
          Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        <div className="doctor-avatar">
          <div className="avatar-placeholder">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="availability-indicator available"></div>
        </div>
        <div className="doctor-basic-info">
          <h3>{doctor.name}</h3>
          <p className="specialty">{doctor.specialty}</p>
          <div className="experience">
            <span>{doctor.experience} experience</span>
          </div>
          <div className="rating-location">
            <div className="rating">
              <Star className="star-icon filled" size={16} />
              <span>{doctor.rating}</span>
              <span className="rating-count">(124 reviews)</span>
            </div>
            <div className="location">
              <MapPin size={14} />
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>
        <div className="consultation-fee">
          <div className="fee-amount">
            <IndianRupee size={16} />
            <span>{doctor.consultationFee}</span>
          </div>
          <p>Consultation Fee</p>
        </div>
      </div>

      <div className="doctor-details">
        <div className="about">
          <p>{doctor.about}</p>
        </div>

        <div className="doctor-meta">
          <div className="languages">
            <Languages size={16} />
            <span>Languages: {doctor.languages.join(', ')}</span>
          </div>
          <div className="availability">
            <Clock size={16} />
            <span>{doctor.availability}</span>
          </div>
        </div>

        <div className="next-available">
          <Calendar size={16} />
          <span>Next Available: <strong>{doctor.nextAvailable}</strong></span>
        </div>
      </div>

      <div className="doctor-card-footer">
        <button className="btn-outline">View Profile</button>
        <button 
          className="btn-primary"
          onClick={() => onBookAppointment(doctor)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}