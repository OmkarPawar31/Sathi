import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, Video, Phone, MessageSquare } from 'lucide-react';

export default function AppointmentSchedule({ appointments }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'

  // Generate week view dates
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  // Generate time slots for schedule
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(patient => patient.nextAppointment === dateStr);
  };

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'audio': return <Phone size={16} />;
      case 'chat': return <MessageSquare size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getAppointmentColor = (severity) => {
    switch (severity) {
      case 'mild': return 'appointment-mild';
      case 'moderate': return 'appointment-moderate';
      case 'severe': return 'appointment-severe';
      default: return 'appointment-default';
    }
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  if (viewMode === 'day') {
    const dayAppointments = getAppointmentsForDate(currentDate);
    
    return (
      <div className="appointment-schedule day-view">
        <div className="schedule-header">
          <div className="schedule-navigation">
            <button onClick={() => navigateDay(-1)}>
              <ChevronLeft size={20} />
            </button>
            <h1>{currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</h1>
            <button onClick={() => navigateDay(1)}>
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="schedule-controls">
            <button 
              className="btn-secondary"
              onClick={() => setViewMode('week')}
            >
              Week View
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              Block Time
            </button>
          </div>
        </div>

        <div className="day-schedule">
          <div className="time-slots">
            {getTimeSlots().map(time => {
              const appointment = dayAppointments.find(apt => apt.appointmentTime.includes(time));
              
              return (
                <div key={time} className="time-slot">
                  <div className="time-label">{time}</div>
                  <div className="appointment-slot">
                    {appointment ? (
                      <div className={`appointment-block ${getAppointmentColor(appointment.severity)}`}>
                        <div className="appointment-content">
                          <div className="appointment-header">
                            <span className="patient-name">{appointment.name}</span>
                            {getAppointmentTypeIcon(appointment.consultationType)}
                          </div>
                          <div className="appointment-condition">{appointment.condition}</div>
                          <div className="appointment-time">{appointment.appointmentTime}</div>
                        </div>
                        <div className="appointment-actions">
                          <button className="btn-primary-small">Start</button>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-slot">
                        <button className="add-appointment">
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Week view
  const weekDates = getWeekDates();
  
  return (
    <div className="appointment-schedule week-view">
      <div className="schedule-header">
        <div className="schedule-navigation">
          <button onClick={() => navigateWeek(-1)}>
            <ChevronLeft size={20} />
          </button>
          <h1>{formatMonthYear(currentDate)}</h1>
          <button onClick={() => navigateWeek(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="schedule-controls">
          <button 
            className="btn-secondary"
            onClick={() => setViewMode('day')}
          >
            Day View
          </button>
          <button className="btn-primary">
            <Plus size={16} />
            Add Availability
          </button>
        </div>
      </div>

      <div className="week-grid">
        <div className="week-header">
          <div className="time-column-header">Time</div>
          {weekDates.map(date => (
            <div 
              key={date.toISOString()}
              className={`day-header ${isToday(date) ? 'today' : ''}`}
            >
              <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="day-number">{date.getDate()}</div>
              <div className="day-appointments-count">
                {getAppointmentsForDate(date).length} appointments
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-grid">
          {getTimeSlots().map(time => (
            <div key={time} className="time-row">
              <div className="time-label">{time}</div>
              {weekDates.map(date => {
                const dayAppointments = getAppointmentsForDate(date);
                const appointment = dayAppointments.find(apt => 
                  apt.appointmentTime.includes(time.substring(0, 2))
                );
                
                return (
                  <div 
                    key={`${date.toISOString()}-${time}`}
                    className={`schedule-cell ${isToday(date) ? 'today' : ''}`}
                  >
                    {appointment ? (
                      <div className={`appointment-item ${getAppointmentColor(appointment.severity)}`}>
                        <div className="appointment-info">
                          <div className="patient-name">{appointment.name}</div>
                          <div className="appointment-type">
                            {getAppointmentTypeIcon(appointment.consultationType)}
                            <span>{appointment.condition}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-cell">
                        <button className="add-slot">+</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="schedule-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">This Week:</span>
            <span className="stat-value">{appointments.length} appointments</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Today:</span>
            <span className="stat-value">{getAppointmentsForDate(new Date()).length} appointments</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Available slots:</span>
            <span className="stat-value">15 this week</span>
          </div>
        </div>

        <div className="legend">
          <h3>Severity Levels:</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="color-indicator appointment-mild"></div>
              <span>Mild</span>
            </div>
            <div className="legend-item">
              <div className="color-indicator appointment-moderate"></div>
              <span>Moderate</span>
            </div>
            <div className="legend-item">
              <div className="color-indicator appointment-severe"></div>
              <span>Severe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}