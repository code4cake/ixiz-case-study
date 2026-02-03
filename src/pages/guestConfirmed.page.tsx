export default function GuestConfirmed() {
  return (
    <div className="min-h-screen bg-white px-5 pb-10 pt-20">
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center text-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-green-600">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mt-8 text-lg font-medium text-gray-900">Your parking spot has been confirmed.</p>
      </div>
    </div>
  );
}
