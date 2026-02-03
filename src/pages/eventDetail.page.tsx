import { Progress } from "../components/progressBar";
import { Button } from "../components/button";
import { useGetEvent } from "../queries/events.queries";

type Props = {
  eventId: string;
  onBack: () => void;
  onShareLink: (eventId: string, token: string) => void;
};

// Helper to split title
function formatTitle(title: string) {
  const words = title.split(" ");
  if (words.length <= 1) return { first: title, rest: "" };
  return { first: words[0], rest: words.slice(1).join(" ") };
}

export default function EventDetail({ eventId, onBack, onShareLink }: Props) {
  const { data: event, isLoading, isError, error } = useGetEvent(eventId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-5 pb-10 pt-8">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-600">
          Loading event…
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-white px-5 pb-10 pt-8">
        <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
          Failed to load event:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>

        <div className="mt-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-700 underline"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>
      </div>
    );
  }

  const { first, rest } = formatTitle(event.title);
  const dateTime = `${event.start} - ${event.end}`;

  return (
    <div className="min-h-screen bg-white px-5 pb-10 pt-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          {first}
          {rest && (
            <>
              <br />
              <span className="ml-4">{rest}</span>
            </>
          )}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700">
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
          <div>{dateTime}</div>
          <div className="mt-1">{event.address}</div>
        </div>

        <p className="whitespace-pre-line text-base leading-7 text-gray-700">
          {event.description}
        </p>
      </section>

      <section className="mt-10">
        <Button onClick={() => onShareLink(event.id, event.guestTokenShareLink)}>
          <span className="inline-flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Share guest link
          </span>
        </Button>

        <p className="mt-2 text-center text-sm text-gray-500">
          Guests can use this link to reserve a parking spot.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-700 underline"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>
      </section>
    </div>
  );
}