import React, { useState } from 'react';
import { updateEvent } from '../api/services';
import { CustomEvent } from '../types';

export const useEventMenu = (props: {
  selectedEvent: CustomEvent;
  setSelectedEvent: Function;
  formState: string;
  setFormState: Function;
}) => {
  const { selectedEvent, setSelectedEvent, formState, setFormState } = props;
  const [updatedEvent, setUpdatedEvent] = useState<CustomEvent>(selectedEvent);
  const [selectedTime, setSelectedTime] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: Date | string | any = value;
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

    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: newValue,
    }));
  };

  return {
    updatedEvent,
    handleChange,
    selectedTime,
  };
};
