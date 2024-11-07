import React, { useState } from 'react';

function EventForm({ selectedDate, addEvent }) {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description) return;
        addEvent(selectedDate, description);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Opis wydarzenia"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Dodaj Wydarzenie</button>
        </form>
    );
}

export default EventForm;
