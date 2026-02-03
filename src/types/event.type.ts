export type Event = {
  id: string;
  title: string;
  start: string; // ISO or display string
  end: string;
  address: string;
  description: string;
  capacityTotal: number;
  capacityReserved: number;
  guestTokenShareLink: string;
};
