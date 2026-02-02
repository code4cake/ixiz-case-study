import { useEffect, useState } from "react";
import EventList from "./pages/eventList.page";
import EventDetail from "./pages/eventDetail.page";
import GuestReserve from "./pages/guestReserve.page";
import GuestConfirmed from "./pages/guestConfirmed.page";

type View =
  | { name: "events" }
  | { name: "eventDetail"; eventId: string }
  | { name: "guestReserve"; eventId: string; token?: string }
  | { name: "guestConfirmed" };

export default function App() {
  const [view, setView] = useState<View>({ name: "events" });

  // Parse guest link on first load: /?mode=guest&eventId=evt_1&token=token_evt_1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const eventId = params.get("eventId");
    const token = params.get("token") ?? undefined;

    if (mode === "guest" && eventId) {
      setView({ name: "guestReserve", eventId, token });
    }
  }, []);

  if (view.name === "events") {
    return (
      <EventList
        onOpenEvent={(eventId: string) => setView({ name: "eventDetail", eventId })}
      />
    );
  }

  if (view.name === "eventDetail") {
    return (
      <EventDetail
        eventId={view.eventId}
        onBack={() => setView({ name: "events" })}
        onShareLink={(eventId: string, token: string) => {
          const url = `${window.location.origin}${window.location.pathname}?mode=guest&eventId=${encodeURIComponent(
            eventId
          )}&token=${encodeURIComponent(token)}`;
          navigator.clipboard?.writeText(url);
          alert("Guest link copied!");
        }}
      />
    );
  }

  if (view.name === "guestReserve") {
    return (
      <GuestReserve
        eventId={view.eventId}
        token={view.token}
        onConfirmed={() => setView({ name: "guestConfirmed" })}
      />
    );
  }

  return <GuestConfirmed />;
}
