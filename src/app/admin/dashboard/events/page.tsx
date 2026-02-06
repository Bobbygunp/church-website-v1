// app/admin/dashboard/events/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), { ssr: false });

export default function EditEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Initial State
  const [formData, setFormData] = useState({
    title: "Monthly Fellowship",
    startDate: "",
    location: "Bethel Church of Santa Clara\n3536 Monroe St, Santa Clara, CA 95051",
    verseEnglish: "",
    verseRefEnglish: "",
    verseTelugu: "",
    verseRefTelugu: "",
    greeting: "",
    speakerName: "",
    speakerBio: "",
    speakerImage: "", // Stores the Base64 string
  });

  // Standard handler for text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRichTextChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // FIXED: Special handler for Image Uploads
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset status
    setMessage("");
    setLoading(true);

    try {
      // 1. Get a pre-signed URL from your API
      const res = await fetch('/api/s3/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type }),
      });

      if (!res.ok) {
        throw new Error('Failed to get pre-signed URL.');
      }

      const { signedUrl, objectUrl } = await res.json();

      // 2. Upload the file to the pre-signed URL
      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image to S3.');
      }

      // 3. Store the final URL in the form state
      setFormData((prev) => ({
        ...prev,
        speakerImage: objectUrl,
      }));

      setMessage("Image uploaded successfully!");

    } catch (error) {
      console.error('Image upload error:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Image upload failed.'}`);
    } finally {
      setLoading(false);
      // Reset the file input so you can re-upload the same file if needed
      e.target.value = "";
    }
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
        router.refresh();
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
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" required />
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
                <textarea name="verseEnglish" rows={3} value={formData.verseEnglish} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reference (English)</label>
                <input type="text" name="verseRefEnglish" placeholder="e.g. Psalm 23:1" value={formData.verseRefEnglish} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
            </div>
            {/* Telugu */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Verse (Telugu)</label>
                <textarea name="verseTelugu" rows={3} value={formData.verseTelugu} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reference (Telugu)</label>
                <input type="text" name="verseRefTelugu" placeholder="e.g. కీర్తనలు 23:1" value={formData.verseRefTelugu} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
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
              <TiptapEditor value={formData.greeting} onChange={(value) => handleRichTextChange("greeting", value)} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Speaker Name</label>
                <input type="text" name="speakerName" value={formData.speakerName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Speaker Image (Upload)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange} 
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                />
                
                {/* Preview the selected image */}
                {formData.speakerImage && (
                  <div className="mt-4 relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
                    <img 
                      src={formData.speakerImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Speaker Bio</label>
              <TiptapEditor value={formData.speakerBio} onChange={(value) => handleRichTextChange("speakerBio", value)} />



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