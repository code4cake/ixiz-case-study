import { ProgressBar } from '../components/progressBar.tsx';
import { Button } from '../components/button';
import { Icon } from '../components/icon';

import { useGetEvent } from '../queries/events.queries';

import { formatTitle } from '../utils/formatTitle.utils';
import { Loader } from '../components/loader.tsx';

type EventDetailProps = {
  eventId: string;
  onBack: () => void;
  onShareLink: (eventId: string, token: string) => void;
};

export default function EventDetail({ eventId, onBack, onShareLink }: EventDetailProps) {
  const { data: event, isLoading, isError, error } = useGetEvent(eventId);

  if (isLoading) {
    return <Loader text="Loading event…" />;
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-white px-5 pb-10 pt-8 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
            Failed to load event: {error instanceof Error ? error.message : 'Unknown error'}
          </div>

          <div className="mt-6">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-700 underline">
              <Icon name="arrowBack" />
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { first, rest } = formatTitle(event.title);
  const dateTime = `${event.start} - ${event.end}`;

  return (
    <div className="min-h-screen bg-white px-5 pb-10 pt-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <header>
          <h1 className="text-4xl font-semibold tracking-normal leading-text-gray-900">{first + " " + rest}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-text-primary rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1 text-base font-medium text-text">
              {event.capacityReserved} / {event.capacityTotal} reserved
            </span>

            <div className="flex-1">
              <ProgressBar value={event.capacityReserved} max={event.capacityTotal} />
            </div>
          </div>

          <p className="my-3 text-lg text-gray-600">Manage guest parking for upcoming events.</p>
        </header>

        <section className="grid mt-5 gap">
          <div className="text-base text-gray-600">
            <div>{dateTime}</div>
            <div className="mt-1">{event.address}</div>
          </div>

          <p className="whitespace-pre-line text-base leading-7 text-text-primary mt-5">{event.description}</p>
        </section>

        <section className="mt-10">
          <Button onClick={() => onShareLink(event.id, event.guestTokenShareLink)}>
            <span className="inline-flex items-center gap-2">
              <Icon name="share" />
              Share guest link
            </span>
          </Button>

          <p className="mt-2 text-center text-sm text-gray-600">Guests can use this link to reserve a parking spot.</p>

          <div className="mt-8 flex justify-center">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-text-primary underline">
              <Icon name="arrowBack" />
              Go back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}