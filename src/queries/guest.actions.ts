import { reserveGuestSpot } from '../api/events.api';

export interface ReserveGuestSpotPayload {
  eventId: string;
  token?: string;
}

export const reserveGuestParking = async (payload: ReserveGuestSpotPayload) => {
  try {
    const res = await reserveGuestSpot(payload);
    if (!res) {
      throw new Error('Reservation failed');
    }
    return res;
  } catch (error: unknown) {
    throw new Error((error as Error).message || 'Failed to reserve parking spot');
  }
};
