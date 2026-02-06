// app/events/this-month/page.tsx
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/Navbar";

// Initialize Prisma
const prisma = new PrismaClient();

// This function fetches the data from your database
async function getLatestEvent() {
  // We try to find the event marked as "isFeatured", or just the most recent one
  const event = await prisma.event.findFirst({
    where: { isFeatured: true },
    orderBy: { startDate: 'desc' },
  });
  return event;
}

export default async function ThisMonthPage() {
  // Fetch data
  const event = await getLatestEvent();

  // FALLBACK: If no event is in the DB yet, show this placeholder so the page doesn't crash
  const data = event || {
    title: "Monthly Fellowship Gathering",
    startDate: new Date(),
    location: "123 Church Lane, City, State",
    
    verseEnglish: "The Lord is my shepherd; I shall not want.",
    verseTelugu: "యెహోవా నా కాపరి; నాకు లేమి కలుగదు.",
    
    // NEW FIELDS
    verseRefEnglish: "Psalm 23:1",
    verseRefTelugu: "కీర్తనలు 23:1",
    
    greeting: "Welcome to our monthly gathering! We are excited to fellowship together.",
    speakerName: "Rev. John Doe",
    speakerBio: "An inspiring speaker with a passion for ministry.",
    speakerImage: null, // or "/api/placeholder/..."
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-30">
      <Navbar />

      {/* 1. Header Section */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FA8072]">
          This Month's Event
        </h1>
        <p className="text-gray-300 text-lg">Join us for a time of worship and word</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        
        {/* 2. The Verse Card (English & Telugu) */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 mb-8">
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            
            {/* English Side */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Verse of the Month</h3>
              <p className="text-xl font-serif text-slate-800 italic">
                "{data.verseEnglish}"
              </p>
              {/* English Reference */}
              <p className="text-blue-600 font-bold text-sm mt-2">– {data.verseRefEnglish}</p>
            </div>

            {/* Telugu Side */}
            <div className="space-y-2 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">వాగ్దాన వచనము</h3>
              <p className="text-xl font-serif text-slate-800 leading-relaxed">
                "{data.verseTelugu}"
              </p>
              {/* Telugu Reference */}
              <p className="text-blue-600 font-bold text-sm mt-2">– {data.verseRefTelugu}</p>
            </div>

          </div>
        </div>

        {/* 3. Personal Greeting */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Greetings in the name of our Lord</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {data.greeting}
          </p>
        </div>

        {/* 4. Event Logistics (Date & Address) */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-xl text-center">
            <h3 className="text-blue-100 text-sm font-bold uppercase mb-2">When</h3>
            <p className="text-2xl font-bold">
              {new Date(data.startDate).toLocaleDateString('en-US', { 
                weekday: 'long', month: 'long', day: 'numeric' 
              })}
            </p>
            <p className="text-xl">
              {new Date(data.startDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="bg-slate-800 text-white p-6 rounded-xl text-center">
            <h3 className="text-slate-400 text-sm font-bold uppercase mb-2">Where</h3>
            <p className="text-lg font-medium px-8">
              {data.location}
            </p>
          </div>
        </div>

        {/* 5. Guest Speaker Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-12">
          {/* Speaker Image */}
          <div className="md:w-1/3 bg-gray-200 relative min-h-[300px]">
            {data.speakerImage && (
              <Image 
                src={data.speakerImage} // Ensure this URL is valid or configure next.config.js for external images
                alt={data.speakerName}
                fill
                className="object-cover"
              />
            )}
            {/* Fallback if no image */}
            {!data.speakerImage && (
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 No Image
               </div>
            )}
          </div>
          
          {/* Speaker Details */}
          <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <h3 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">Guest Speaker</h3>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{data.speakerName}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {data.speakerBio}
            </p>
          </div>
        </div>

        {/* 6. Footer / Contact Links */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-xl text-slate-700 font-medium mb-6">
            We look forward to seeing you there! Blessings.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             {/* Email Button */}
            <a 
              href="mailto:TeluguChristianFellowship@gmail.com" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {/* Email Us */}
            </a>

            {/* YouTube Button */}
            <a 
              href="https://www.youtube.com/@teluguchristianfellowship" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              {/* Watch Live */}
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}