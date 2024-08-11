import { useCallback, useEffect, useState } from 'react';
import { addEvent, fetchEvents } from '../api/services';
import { CustomEvent } from '../types';

export const useEvents = () => {
  const [data, setData] = useState<CustomEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<string>('edit');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        setData(events);
      } catch (err) {
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const reftchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const events = await fetchEvents();
      setData(events);
    } catch (err) {
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data: data,
    setSelectedEvent,
    selectedEvent,
    formState,
    setFormState,
    reftchEvents
  };
};
