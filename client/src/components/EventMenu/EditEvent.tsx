import { Button, TextField } from '@mui/material';
import React from 'react';
import { useEditEvent } from '../../hooks/useEditEvent';
import { CustomEvent } from '../../types';

const EditEvent: React.FC<{
  event: CustomEvent;
  setSelectedEvent: Function;
  refetchEvents: Function;
}> = ({ event, setSelectedEvent, refetchEvents }) => {
  const { newEvent, handleChange, handleSubmit, handleDelete } = useEditEvent(
    event,
    setSelectedEvent,
    refetchEvents
  );

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
        value={new Date(newEvent.time)}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button type='submit'>Save</Button>
      <Button
        color='error'
        type='button'
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </Button>
    </form>
  );
};

export default EditEvent;
