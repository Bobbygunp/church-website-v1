export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us - Work in Progress</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are building something special! Our full story and mission will be shared here soon.
        </p>
        <blockquote className="text-xl italic text-gray-700 border-l-4 border-green-500 pl-4 py-2 mx-auto max-w-lg">
          "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."
          <footer className="mt-2 text-sm text-gray-500">— Matthew 28:19-20</footer>
        </blockquote>
      </div>
    </div>
  );
}
