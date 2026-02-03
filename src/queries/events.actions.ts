import { mockEvents } from '../api/mockDb';
import type { Event } from '../types/event.type';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchEvents(): Promise<Event[]> {
  await sleep(250);
  return mockEvents;
}

export async function fetchEvent(eventId: string): Promise<Event> {
  await sleep(200);
  const evt = mockEvents.find((e) => e.id === eventId);
  if (!evt) throw new Error('Event not found');
  return evt;
}

export interface ReserveGuestSpotPayload {
  eventId: string;
  token?: string;
}

export async function reserveGuestSpot(args: ReserveGuestSpotPayload) {
  try {
    await sleep(250);
    const evt = mockEvents.find((e) => e.id === args.eventId);
    if (!evt) throw new Error('Event not found');
    if (args.token && args.token !== evt.guestTokenShareLink) {
      throw new Error('Invalid guest link');
    }
    evt.capacityReserved += 1; // mutate mock DB
    return evt;
  } catch (error: unknown) {
    throw new Error((error as Error).message || 'Failed to reserve parking spot');
  } finally {
    await sleep(250);
  }
}
