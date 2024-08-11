import { Button, TextField } from '@mui/material';
import React from 'react';
import { useAddEvent } from '../../hooks/useAddEvent';

const AddEvent: React.FC<{
  setSelectedEvent: Function;
  refetchEvents: Function
}> = ({ setSelectedEvent, refetchEvents }) => {
  const { newEvent, handleChange, handleSubmit } = useAddEvent({
    setSelectedEvent,
    refetchEvents
  });

  return (
    <form className='form' onSubmit={handleSubmit}>
      <TextField
        label='Title'
        name='title'
        value={newEvent.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label='Description'
        name='description'
        value={newEvent.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label='Location'
        name='location'
        value={newEvent.location}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label='Date'
        name='time'
        type='datetime-local'
        value={newEvent.time.toISOString().slice(0, 16)}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button type='submit'>Create Event</Button>
    </form>
  );
};

export default AddEvent;
