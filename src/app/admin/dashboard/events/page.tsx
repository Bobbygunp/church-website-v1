"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Initial State
  const [formData, setFormData] = useState({
    title: "Monthly Fellowship",
    startDate: "",
    location: "Bethel Church of Santa Clara, 3536 Monroe St, Santa Clara, CA 95051",
    verseEnglish: "",
    verseRefEnglish: "",
    verseTelugu: "",
    verseRefTelugu: "",
    greeting: "",
    speakerName: "",
    speakerBio: "",
    speakerImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/events/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Event updated successfully!");
        router.refresh(); // Refresh data
      } else {
        setMessage("Error updating event.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Edit This Month's Event</h1>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow border border-gray-200">
        
        {/* Section 1: Logistics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-[#535050]" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full text-[#535050] rounded-md border-gray-300 shadow-sm border p-2" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full text-[#535050] rounded-md border-gray-300 shadow-sm border p-2" required />
            </div>
          </div>
        </div>

        {/* Section 2: Verses */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Verse of the Month</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Verse (English)</label>
                <textarea name="verseEnglish" rows={3} value={formData.verseEnglish} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reference (English)</label>
                <input type="text" name="verseRefEnglish" placeholder="e.g. Psalm 23:1" value={formData.verseRefEnglish} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
            </div>
            {/* Telugu */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Verse (Telugu)</label>
                <textarea name="verseTelugu" rows={3} value={formData.verseTelugu} onChange={handleChange} className="mt-1 block w-full text-[#535050] rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reference (Telugu)</label>
                <input type="text" name="verseRefTelugu" placeholder="e.g. కీర్తనలు 23:1" value={formData.verseRefTelugu} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Greeting & Speaker */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Content & Speaker</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Greeting</label>
              <textarea name="greeting" rows={3} value={formData.greeting} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Speaker Name</label>
                <input type="text" name="speakerName" value={formData.speakerName} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Speaker Image URL</label>
                <input type="text" name="speakerImage" placeholder="https://..." value={formData.speakerImage} onChange={handleChange} className="mt-1 text-[#535050] block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Speaker Bio</label>
              <textarea name="speakerBio" rows={4} value={formData.speakerBio} onChange={handleChange} className="mt-1 block w-full text-[#535050] rounded-md border-gray-300 shadow-sm border p-2" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Update Event Details"}
          </button>
        </div>

      </form>
    </div>
  );
}