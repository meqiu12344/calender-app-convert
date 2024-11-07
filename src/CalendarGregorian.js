import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarLiturgic({ selectedDate, events, onDateChange, onDeleteEvent, onOpenEventModal }) {
    const getEventsForDate = (date) => {
        return events.filter(event => new Date(event.gregorianDate).toDateString() === date.toDateString());
    };

    return (
        <div className="calendar-wrapper">
            <h2>Kalendarz Gregoriańska</h2>
            <Calendar
                value={selectedDate}
                onChange={onDateChange}
                tileContent={({ date }) => {
                    const eventList = getEventsForDate(date);
                    return eventList.length > 0 ? (
                        <div className="event-marker">
                            {eventList.map((e, index) => (
                                <span key={index} className="event-dot" onClick={() => onOpenEventModal(e)}>•</span>
                            ))}
                        </div>
                    ) : null;
                }}
            />
        </div>
    );
}

export default CalendarLiturgic;
