import { Progress } from "../components/progressBar";
import { Button } from "../components/button";
import { useGetEvent } from "../queries/events.queries";

type Props = {
  eventId: string;
  onBack: () => void;
  onShareLink: (eventId: string, token: string) => void;
};

export default function EventDetail({ eventId, onBack, onShareLink }: Props) {
  const { data: event, isLoading, isError, error } = useGetEvent(eventId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-5 pb-10 pt-8">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-600">
          Loading event…
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-gray-50 px-5 pb-10 pt-8">
        <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
          Failed to load event:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>

        <div className="mt-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-800 underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 pb-10 pt-8">
      <header>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
          {event.title}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-900">
            {event.capacityReserved} / {event.capacityTotal} reserved
          </span>

          <div className="flex-1">
            <Progress value={event.capacityReserved} max={event.capacityTotal} />
          </div>
        </div>

        <p className="mt-3 text-base text-gray-600">
          Manage guest parking for upcoming events
        </p>
      </header>

      <section className="mt-10 space-y-6">
        <div className="text-sm leading-6 text-gray-600">
          <div>
            {event.start} - {event.end}
          </div>
          <div>{event.address}</div>
        </div>

        <p className="whitespace-pre-line text-base leading-7 text-gray-900">
          {event.description}
        </p>
      </section>

      <section className="mt-10">
        <Button onClick={() => onShareLink(event.id, event.guestTokenShareLink)}>
          ✈️ Share guest link
        </Button>

        <p className="mt-2 text-center text-sm text-gray-500">
          Guests can use this link to reserve a parking spot.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-800 underline"
          >
            ← Go back
          </button>
        </div>
      </section>
    </div>
  );
}
