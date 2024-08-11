import { useState } from 'react';
import { addEvent } from '../api/services';
import { CustomEvent } from '../types';

export const useAddEvent = (props: {
  setSelectedEvent: Function;
  refetchEvents: Function;
}) => {
  const [newEvent, setNewEvent] = useState<CustomEvent>({
    id: 0,
    title: '',
    description: '',
    location: '',
    time: new Date(),
  });
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: Date | string = value;

    if (name === 'time') {
      setSelectedTime(value);
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

    setNewEvent((prevEvent: CustomEvent) => ({
      ...prevEvent,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addEvent(newEvent);
      // Optionally, clear the form or handle the successful submission
      setNewEvent({
        id: 0,
        title: '',
        description: '',
        location: '',
        time: new Date(),
      });
      props.setSelectedEvent(null)
      props.refetchEvents();
    } catch (err) {
      console.error('Failed to add event:', err);
    }
  };

  return {
    newEvent,
    handleChange,
    handleSubmit,
    selectedTime,
  };
};
