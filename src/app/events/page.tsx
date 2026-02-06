export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Events - Work in Progress</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are currently working hard to bring you exciting new events! Please check back soon for updates.
        </p>
        <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mx-auto max-w-lg">
          "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching."
          <footer className="mt-2 text-sm text-gray-500">— Hebrews 10:24-25</footer>
        </blockquote>
      </div>
    </div>
  );
}
