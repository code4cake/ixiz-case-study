import { useMemo, useState } from 'react';

import { useGetEvent } from '../queries/events.queries';
import { useReserveGuestSpot } from '../queries/guest.mutation';

import { ProgressBar } from '../components/progressBar.tsx';
import { Button } from '../components/button';
import { Loader } from '../components/loader.tsx';

import { showToast } from '../utils/showToast.utils';
import { formatTitle } from '../utils/formatTitle.utils';

type GuestReserveProps = {
  eventId: string;
  token?: string;
  onConfirmed: () => void;
};

export default function GuestReserve({ eventId, onConfirmed }: GuestReserveProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: event, isLoading, isError, error } = useGetEvent(eventId);

  const reserveMutation = useReserveGuestSpot({ eventId });

  const remaining = useMemo(() => {
    if (!event) return 0;
    return Math.max(0, event.capacityTotal - event.capacityReserved);
  }, [event]);

  const isFull = remaining <= 0;

  const handleReserve = async () => {
    if (!event) return;
    setErrorMsg(null);

    try {
      await reserveMutation.mutateAsync();
      onConfirmed();
    } catch (e: unknown) {
      setErrorMsg((e as Error).message || 'Failed to reserve parking spot');
      showToast({
        type: 'error',
        message: (e as Error).message || 'Failed to reserve parking spot',
      });
    }
  };

  if (isLoading) {
    return <Loader text="Loading event…" />;
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-white px-5 pb-10 pt-8">
        <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
          Failed to load event: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  const { first, rest } = formatTitle(event.title);
  const dateTime = `${event.start} - ${event.end}`;

  return (
    <div className="min-h-screen bg-white px-5 pb-10 pt-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{first + ' ' + rest}</h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1 text-base font-medium text-gray-700">
            {remaining} spots remaining
          </span>

          <div className="flex-1">
            <ProgressBar value={event.capacityReserved} max={event.capacityTotal} />
          </div>
        </div>
      </header>

      <section className="mt-10 space-y-6">
        <div className="text-base leading-6 text-gray-600">
          <div>{dateTime}</div>
          <div className="mt-1">{event.address}</div>
        </div>

        <p className="whitespace-pre-line text-base leading-6 text-text-primary">{event.description}</p>
      </section>

      <section className="mt-10 space-y-3">
        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-white p-3 text-sm text-red-700">{errorMsg}</div>
        )}

        <Button onClick={handleReserve} disabled={isFull || reserveMutation.isPending}>
          {reserveMutation.isPending ? 'Reserving…' : isFull ? 'No spots remaining' : 'Reserve parking for this event'}
        </Button>

        <p className="text-center text-base text-gray-500">You will not be asked for personal details.</p>
      </section>
    </div>
  );
}
