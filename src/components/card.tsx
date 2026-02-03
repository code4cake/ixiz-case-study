import { ProgressBar } from './progressBar';

interface CardProps {
  children?: React.ReactNode;
  cardTitle: string;
  startDate: string;
  endDate: string;
  address: string;
  capacityReserved: number;
  capacityTotal: number;
  onClick: () => void;
}

export function Card({
  children,
  cardTitle,
  startDate,
  endDate,
  address,
  capacityReserved,
  capacityTotal,
  onClick,
}: CardProps) {
  return (
    <div onClick={onClick} className="block w-full text-left cursor-pointer" aria-label={`Open ${cardTitle}`}>
      <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
        <ProgressBar value={capacityReserved} max={capacityTotal} />

        <div className="p-4 flex flex-col gap-3">
          <h2 className="text-3xl font-semibold text-gray-900">{cardTitle}</h2>

          <div className="flex flex-col text-base text-gray-600">
            <div>
              {startDate} - {endDate}
            </div>
            <div>{address}</div>
          </div>

          <div className="flex items-center gap-2 text-base text-gray-900 mt-4">
            <span className="font-bold text-gray-800">Guest parking:</span>
            <span className=" text-sm font-medium inline-flex items-center rounded-sm border border-gray-300 bg-gray-100 px-2.5 py-0.5 text-text-primary">
              {capacityReserved} / {capacityTotal} reserved
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
