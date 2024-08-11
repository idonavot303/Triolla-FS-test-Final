import React from 'react';
import EditEvent from './EditEvent';
import AddEvent from './AddEvent';
import { useEventMenu } from '../../hooks/useEventMenu';
import { CustomEvent } from '../../types';

interface EventMenuProps {
  event: CustomEvent;
  setSelectedEvent: (user: CustomEvent | null) => void;
  formState: string;
  setFormState: (formState: string) => void;
  refetchEvents: Function;
}

const EventMenu: React.FC<EventMenuProps> = ({
  event,
  setSelectedEvent,
  formState,
  setFormState,
  refetchEvents,
}) => {
  useEventMenu({
    selectedEvent: event,
    setSelectedEvent,
    formState,
    setFormState,
  });

  return (
    <div className='userMenu'>
      <div className='menuHeader'>
        <button
          className='closeBtn'
          onClick={() => {
            setSelectedEvent(null);
            setFormState('edit');
          }}
        >
          X
        </button>
        <button className='createBtn' onClick={() => setFormState('add')}>
          Add Event
        </button>
      </div>

      {formState === 'edit' && (
        <EditEvent
          event={event}
          setSelectedEvent={setSelectedEvent}
          refetchEvents={refetchEvents}
        />
      )}
      {formState === 'add' && (
        <AddEvent
          setSelectedEvent={setSelectedEvent}
          refetchEvents={refetchEvents}
        />
      )}
    </div>
  );
};

export default EventMenu;
