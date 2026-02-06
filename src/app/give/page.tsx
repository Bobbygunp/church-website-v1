export default function GivePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Giving - Work in Progress</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are preparing a secure and convenient way for you to give online. Please check back soon!
        </p>
        <blockquote className="text-xl italic text-gray-700 border-l-4 border-purple-500 pl-4 py-2 mx-auto max-w-lg">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          <footer className="mt-2 text-sm text-gray-500">— 2 Corinthians 9:7</footer>
        </blockquote>
      </div>
    </div>
  );
}
