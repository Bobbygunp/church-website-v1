// src/app/admin/dashboard/manage-admins/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { FaTrash } from "react-icons/fa"; // Import trash icon

export default function ManageAdminsPage() {
  const { data: session } = useSession(); // Get session data
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [admins, setAdmins] = useState<any[]>([]); // State to store admin list
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null); // To track which admin is being deleted

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) {
        setAdmins(data.admins);
      } else {
        setMessage(`Error fetching admins: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage("Error fetching admins: An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInvite = async () => {
    setLoading(true);
    setMessage("");
    setInvitationLink("");

    try {
      const res = await fetch('/api/admin/invitations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        const { token } = data.invitation;
        const link = `${window.location.origin}/admin/register?token=${token}`;
        setInvitationLink(link);
        setMessage("Invitation link generated successfully!");
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage("Error: An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (!window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      return;
    }

    if (session?.user?.id === adminId) {
      alert("You cannot delete your own account.");
      return;
    }

    setDeleteLoading(adminId);
    setMessage("");

    try {
      const res = await fetch('/api/admin/users/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: adminId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Admin deleted successfully!");
        fetchAdmins(); // Refresh the list
      } else {
        setMessage(`Error deleting admin: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage("Error deleting admin: An unexpected error occurred.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Admins</h1>

      {/* Invite New Admin Section */}
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Invite New Admin</h2>
        <div className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to invite"
            className="flex-grow rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleInvite}
            disabled={loading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Invite Link"}
          </button>
        </div>
        {message && (
          <div className={`mt-4 p-4 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
        {invitationLink && (
          <div className="mt-4 p-4 rounded bg-blue-50 text-blue-800">
            <p className="font-semibold">Invitation Link (share this with the new admin):</p>
            <input
              type="text"
              readOnly
              value={invitationLink}
              className="mt-2 w-full bg-white p-2 rounded border border-blue-200"
              onFocus={(e) => e.target.select()}
            />
          </div>
        )}
      </div>

      {/* Current Admins Section */}
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Admins</h2>
        {admins.length === 0 ? (
          <p className="text-gray-600">No admin accounts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        disabled={deleteLoading === admin.id || session?.user?.id === admin.id}
                        className={`text-red-600 hover:text-red-900 ${deleteLoading === admin.id ? 'opacity-50 cursor-not-allowed' : ''} ${session?.user?.id === admin.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={session?.user?.id === admin.id ? "Cannot delete your own account" : "Delete Admin"}
                      >
                        {deleteLoading === admin.id ? 'Deleting...' : <FaTrash />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
