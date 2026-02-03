import { useQuery } from '@tanstack/react-query';
import { fetchEvent, fetchEvents } from './events.actions';

export const useGetEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });
};

export const useGetEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
  });
};
