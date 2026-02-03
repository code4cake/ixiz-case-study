import { useMemo } from "react";

interface GuestLinkResult {
  isGuestMode: boolean;
  eventId: string | null;
  token: string | undefined;
}

export function useGuestLinkParams(): GuestLinkResult {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const eventId = params.get("eventId");
    const token = params.get("token") ?? undefined;

    return {
      isGuestMode: mode === "guest",
      eventId,
      token,
    };
  }, []);
}