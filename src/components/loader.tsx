export function Loader({ text }: { text: string }) {
    return (
        <div className="min-h-screen bg-white px-5 pb-10 pt-8">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-600">
                {text}
            </div>
        </div>
    )
}