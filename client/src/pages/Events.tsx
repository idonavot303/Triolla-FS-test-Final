import React, { useEffect, useState } from 'react';
import EventMenu from '../components/EventMenu/EventMenu';
import { CustomEvent } from '../ts/typs';
import { useEvents } from '../hooks/useEvents';

const Events: React.FC = () => {
  const {
    loading,
    error,
    data,
    setSelectedEvent,
    selectedEvent,
    formState,
    setFormState,
    reftchEvents,
  } = useEvents();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='root'>
      <h2>Dashboard</h2>
      <div className='content'>
        <h3 className='subTitle'>Events</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((event: CustomEvent) => (
              <tr key={event.id} onClick={() => setSelectedEvent(event)}>
                <td>#{event.id}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{new Date(event.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <EventMenu
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          formState={formState}
          setFormState={setFormState}
          refetchEvents={reftchEvents}
        />
      )}
    </div>
  );
};

export default Events;
