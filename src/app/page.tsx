// app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white h-[80vh] flex items-center justify-center">
        {/* Background Image Overlay (Optional) */}
        <div className="absolute inset-0 bg-black/50 z-0"></div> 
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Welcome Home
          </h1>
          <p className="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Join us this 4<sup className="leading-none text-xs">th</sup> Saturday at 6:00 PM.
          </p>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            We are a community dedicated to faith, hope, and love.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link href="/events/this-month" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              {/* Watch Sermons */}
              Checkout this month's event
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
            <Link href="/about" className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400">
              I'm New
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE INFO SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Times</h2>
          <div className="grid md:grid-cols-1 gap-8">
            {/* <div className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Sunday Worship</h3>
              <p className="text-gray-600">10:00 AM & 6:00 PM</p>
              <p className="text-sm text-gray-500 mt-2">Main Sanctuary</p>
            </div> */}
            <div className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Monthly Gathering</h3>
              <p className="text-gray-600">Every 4<sup className="leading-none text-xs">th</sup> Saturday at 6:00 PM</p>
              <p className="text-sm text-gray-500 mt-2">Bethel Church of Santa Clara, 3536 Monroe St, Santa Clara, CA 95051</p>
            </div>
            {/* <div className="p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Youth Group</h3>
              <p className="text-gray-600">Fridays at 6:30 PM</p>
              <p className="text-sm text-gray-500 mt-2">Youth Center</p>
            </div> */}
          </div>
        </div>
      </section>

    </main>
  );
}