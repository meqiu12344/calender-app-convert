import React, { useState, useEffect } from 'react';
import CalendarLiturgic from './CalendarLiturgic';
import CalendarGregorian from './CalendarGregorian';
import EventForm from './EventForm';
import EventModal from './EventModal';
import './App.css';

function App() {
  const [selectedLiturgicDate, setSelectedLiturgicDate] = useState(null);
  const [selectedGregorianDate, setSelectedGregorianDate] = useState(null);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleLiturgicDateChange = (date) => {
    setSelectedLiturgicDate(date);
    setSelectedGregorianDate(convertToGregorian(date));
  };

  const handleGregorianDateChange = (date) => {
    setSelectedGregorianDate(date);
    setSelectedLiturgicDate(convertToLiturgic(date));
  };

  const addEvent = (date, description) => {
    const event = {
      liturgicDate: date,
      gregorianDate: convertToGregorian(date),
      description
    };
    setEvents([...events, event]);
  };

  const deleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
    setSelectedEvent(null);  // Zamykamy modal po usunięciu wydarzenia
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  const convertToGregorian = (liturgicDate) => {
    return new Date(liturgicDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  };

  const convertToLiturgic = (gregorianDate) => {
    return new Date(gregorianDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  };

  return (
    <div className="App">
      <h1>Synchronizowane Kalendarze</h1>
      <EventForm selectedDate={selectedLiturgicDate} addEvent={addEvent} />
      <div className="calendar-container">
        <CalendarLiturgic
          selectedDate={selectedLiturgicDate}
          events={events}
          onDateChange={handleLiturgicDateChange}
          onDeleteEvent={deleteEvent}
          onOpenEventModal={openEventModal}
        />
        <CalendarGregorian
          selectedDate={selectedGregorianDate}
          events={events}
          onDateChange={handleGregorianDateChange}
          onDeleteEvent={deleteEvent}
          onOpenEventModal={openEventModal}
        />
      </div>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeEventModal}
          onDelete={() => deleteEvent(selectedEvent)}
        />
      )}
    </div>
  );
}

export default App;