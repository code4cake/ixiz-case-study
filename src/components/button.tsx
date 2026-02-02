export function Button({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={[
          "w-full rounded-md px-4 py-3 text-center font-medium",
          disabled ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white",
        ].join(" ")}
      >
        {children}
      </button>
    );
  }
  