import type { Event } from "../types/event.type";
import { Card } from "../components/card";
import { useGetEvents } from "../queries/events.queries";

type Props = {
  onOpenEvent: (eventId: string) => void;
};

function getStatusColor(e: Event) {
  const ratio = e.capacityReserved / e.capacityTotal;
  if (e.capacityReserved >= e.capacityTotal) return "bg-red-500";
  if (ratio >= 0.9) return "bg-orange-500";
  return "bg-green-600";
}

export default function EventList({ onOpenEvent }: Props) {
  const { data, isLoading, isError, error } = useGetEvents();

  return (
    <div className="min-h-screen bg-gray-50 px-5 pb-10 pt-8">
      <header className="mb-6">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
          Event List
        </h1>
        <p className="mt-2 text-base text-gray-600">
          Manage guest parking for upcoming events
        </p>
      </header>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-600">
          Loading events…
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-white p-4 text-red-700">
          Failed to load events:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      {data && (
        <div className="space-y-5">
          {data.map((e: Event) => {
            const topBar = getStatusColor(e);
            return (
              <button
                key={e.id}
                onClick={() => onOpenEvent(e.id)}
                className="block w-full text-left"
                aria-label={`Open ${e.title}`}
              >
                <div className={`h-1.5 w-full rounded-t-lg ${topBar}`} />
                <Card>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {e.title}
                  </h2>

                  <div className="mt-3 text-sm leading-6 text-gray-600">
                    <div>
                      {e.start} - {e.end}
                    </div>
                    <div>{e.address}</div>
                  </div>

                  <div className="mt-4 text-base text-gray-900">
                    <span className="font-medium text-gray-800">
                      Guest parking:
                    </span>{" "}
                    <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-sm font-medium">
                      {e.capacityReserved} / {e.capacityTotal} reserved
                    </span>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-4 text-base font-medium text-white"
          onClick={() => alert("Add Event not implemented for this test")}
        >
          <span className="text-xl leading-none">＋</span>
          Add Event
        </button>
      </div>
    </div>
  );
}
