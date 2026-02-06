export default function AdminSermonsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sermon Management - Work in Progress</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are building tools to manage your sermons. Please check back soon for updates!
        </p>
        <blockquote className="text-xl italic text-gray-700 border-l-4 border-yellow-500 pl-4 py-2 mx-auto max-w-lg">
          "Preach the Word; be prepared in season and out of season; correct, rebuke and encourage—with great patience and careful instruction."
          <footer className="mt-2 text-sm text-gray-500">— 2 Timothy 4:2</footer>
        </blockquote>
      </div>
    </div>
  );
}
