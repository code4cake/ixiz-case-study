import type { Event } from '../types/event.type';
import { useGetEvents } from '../queries/events.queries';

import { Loader } from '../components/loader';
import { Card } from '../components/card';
import { Icon } from '../components/icon';

import { showToast } from '../utils/showToast.utils';

type EventListProps = {
  onOpenEvent: (eventId: string) => void;
};

export default function EventList({ onOpenEvent }: EventListProps) {
  const { data: events, isLoading, isError, error } = useGetEvents();

  return (
    <div className="min-h-screen bg-gray-50 px-5 pb-10 pt-8">
      <header className="mb-6 grid gap-1">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900">Event List</h1>
        <p className="text-lg text-gray-600">Manage guest parking for upcoming events</p>
      </header>

      {isLoading && <Loader text="Loading events…" />}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
          Failed to load events: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      {events && events.length > 0 && (
        <div className="space-y-5">
          {events.map((e: Event) => {
            return (
              <Card
                key={e.id}
                onClick={() => onOpenEvent(e.id)}
                cardTitle={e.title}
                startDate={e.start}
                endDate={e.end}
                address={e.address}
                capacityReserved={e.capacityReserved}
                capacityTotal={e.capacityTotal}
              />
            );
          })}
        </div>
      )}

      <div className="mt-10">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-4 text-base font-medium text-white"
          onClick={() => {
            showToast({
              message: 'Add Event not implemented for this test',
              type: 'error',
              options: {
                duration: 3000,
                position: 'top-right',
              },
            });
          }}
        >
          <span className="text-xl leading-none">
            <Icon name="plus" />
          </span>
          Add Event
        </button>
      </div>
    </div>
  );
}
