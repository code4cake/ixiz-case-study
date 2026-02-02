import type { Event } from "../types/event.type";

export const mockEvents: Event[] = [
  {
    id: "evt_1",
    title: "Board Meeting - Q1",
    start: "February 01 2026 - 9hr",
    end: "17hr",
    address: "Rue du beau Site 3B, 1000 Bruxelles",
    description:
      "This will be the first meeting of the Quarter. Presence is mandatory. If you cannot be present physically please join online. A video conference link will be provided in the following days.",
    capacityTotal: 20,
    capacityReserved: 12,
    guestTokenShareLink: "token_evt_1",
  },
  {
    id: "evt_2",
    title: "Team Building - Q1",
    start: "February 17 2026 - 17hr",
    end: "00hr",
    address: "Les Halles des Schaerbeek, 1030 Bruxelles",
    description: "Team event and dinner.",
    capacityTotal: 20,
    capacityReserved: 0,
    guestTokenShareLink: "token_evt_2",
  },
  {
    id: "evt_3",
    title: "Bad Bunny Concert - Q3",
    start: "July 22 2026 - 20hr",
    end: "00hr",
    address: "Stade Roi Baudouin - Bruxelles",
    description: "Concert night.",
    capacityTotal: 1000,
    capacityReserved: 980,
    guestTokenShareLink: "token_evt_3",
  },
];
