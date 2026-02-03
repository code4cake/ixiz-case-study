interface ProgressBarProps {
  value: number;
  max: number;
}

function getProgressColor(value: number, max: number): string {
  if (max === 0) return 'bg-gray-400';
  const ratio = value / max;
  if (value >= max) return 'bg-red-500';
  if (ratio >= 0.9) return 'bg-orange-500';
  return 'bg-green-600';
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  const colorClass = getProgressColor(value, max);

  return (
    <div className="h-1.5 w-full rounded-full bg-gray-200">
      <div
        className={`h-1.5 rounded-full ${colorClass} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
