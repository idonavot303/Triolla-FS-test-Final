import axios from 'axios';
import { CustomEvent } from '../ts/typs';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:10000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchEvents = async () => {
  const response = await axiosInstance.get('/');
  return response.data;
};

const deleteEvent = async (id: number) => {
  const response = await axiosInstance.delete(`/api/event/${id}`);
  return response.data;
};

const addEvent = async (event: {
  title: string;
  description: string;
  location: string;
  time: Date;
}) => {
  const response = await axiosInstance.post('/api/event', {
    data: {
      title: event.title,
      description: event.description,
      location: event.location,
      time: event.time.toISOString(),
    },
  });
  return response.data;
};

const updateEvent = async (event: CustomEvent) => {
  const response = await axiosInstance.put(`/api/event/${event.id}`, event);
  return response.data;
};

export { fetchEvents, deleteEvent, addEvent, updateEvent };
