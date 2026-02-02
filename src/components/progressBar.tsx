export function Progress({ value, max }: { value: number; max: number }) {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div className="h-1.5 rounded-full bg-green-600" style={{ width: `${pct}%` }} />
      </div>
    );
  }
  