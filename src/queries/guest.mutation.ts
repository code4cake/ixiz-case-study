import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reserveGuestSpot } from '../api/events.api';

export const useReserveGuestSpot = ({ eventId, token }: { eventId: string; token?: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await reserveGuestSpot({ eventId, token });
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['event', eventId] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
    },
  });
};
