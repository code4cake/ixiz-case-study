export function getStatusColor(capacityReserved: number, capacityTotal: number) {
    const ratio = capacityReserved / capacityTotal;
    if (capacityReserved >= capacityTotal) return "bg-red-500";
    if (ratio >= 0.9) return "bg-orange-500";
    return "bg-green-600";
  }