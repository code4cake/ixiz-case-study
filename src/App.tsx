import {  useMemo, useState } from "react";

import EventList from "./pages/eventList.page";
import EventDetail from "./pages/eventDetail.page";
import GuestReserve from "./pages/guestReserve.page";
import GuestConfirmed from "./pages/guestConfirmed.page";

import { showToast } from "./utils/showToast.utils";

import { useGuestLinkParams } from "./hooks/useGuestLinkParams.hooks";

type View =
  | { name: "events" }
  | { name: "eventDetail"; eventId: string }
  | { name: "guestReserve"; eventId: string; token?: string }
  | { name: "guestConfirmed" };

export default function App() {
  const { isGuestMode, eventId, token } = useGuestLinkParams();
  
  const initialView = useMemo<View>(() => {
    if (isGuestMode && eventId) {
      return { name: "guestReserve", eventId, token };
    }
    return { name: "events" };
  }, [isGuestMode, eventId, token]);

  const [view, setView] = useState<View>(initialView);
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
          showToast({
            type: "success",
            message: `Guest link copied!`,
            });
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
