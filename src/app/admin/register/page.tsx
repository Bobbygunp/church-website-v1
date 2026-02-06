// src/app/admin/register/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RegistrationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const res = await fetch(`/api/admin/invitations/verify?token=${token}`);
          const data = await res.json();

          if (res.ok) {
            setEmail(data.invitation.email);
            setVerificationStatus('valid');
          } else {
            setError(data.error || 'Invalid or expired token.');
            setVerificationStatus('invalid');
          }
        } catch (err) {
          setError('An unexpected error occurred during verification.');
          setVerificationStatus('invalid');
        }
      };
      verifyToken();
    } else {
      setError('No invitation token provided.');
      setVerificationStatus('invalid');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!token) {
      setError('No invitation token found.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  if (verificationStatus === 'verifying') {
    return <div className="text-center p-8">Verifying invitation...</div>;
  }

  if (verificationStatus === 'invalid') {
    return (
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-md">
        <p>{error}</p>
        <Link href="/admin/login" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Login
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center p-8 bg-green-100 text-green-700 rounded-md">
        <p>Admin account created successfully!</p>
        <Link href="/admin/login" className="mt-4 inline-block text-blue-600 hover:underline">
          Proceed to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Admin Account'}
      </button>
    </form>
  );
}


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Admin Account</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <RegistrationForm />
        </Suspense>
      </div>
    </div>
  );
}
