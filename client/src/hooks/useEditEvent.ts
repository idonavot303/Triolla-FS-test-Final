import { useState } from 'react';
import { deleteEvent, updateEvent } from '../api/services';
import { CustomEvent } from '../ts/typs';

export const useEditEvent = (initialEvent: CustomEvent, setSelectedEvent: Function, refetchEvents: Function) => {
  const [newEvent, setEvent] = useState<CustomEvent>(initialEvent);
  const [selectedTime, setSelectedTime] = useState<Date>(newEvent.time);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: Date | string = value;

    if (name === 'time') {
      setSelectedTime(new Date(value));
      const [datePart, timePart] = value.split('T');
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
      newValue = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );
    }

    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateEvent(newEvent);
      setSelectedEvent(null);
      refetchEvents();
    } catch (err) {
      console.error('Failed to update event:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(initialEvent.id);
      setSelectedEvent(null);
      refetchEvents()
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  return {
    newEvent,
    handleChange,
    handleSubmit,
    selectedTime,
    handleDelete
  };
};
