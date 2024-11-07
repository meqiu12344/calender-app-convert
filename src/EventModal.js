import React from 'react';
import './EventModal.css';

function EventModal({ event, onClose, onDelete }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Szczegóły Wydarzenia</h2>
                <p><strong>Opis:</strong> {event.description}</p>
                <p><strong>Data Liturgiczna:</strong> {new Date(event.liturgicDate).toLocaleDateString()}</p>
                <p><strong>Data Gregoriańska:</strong> {new Date(event.gregorianDate).toLocaleDateString()}</p>
                <button onClick={onClose} className="close-btn">Zamknij</button>
                <button onClick={onDelete} className="delete-btn">Usuń</button>
            </div>
        </div>
    );
}

export default EventModal;
