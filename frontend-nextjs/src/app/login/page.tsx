'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginUI() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const requestOtp = async () => {
    const res = await fetch('http://localhost:3001/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: phone }),
    });
    const data = await res.json();
    if (data) setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch('http://localhost:3001/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: phone, otp }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef1ec]">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-2 rounded-full text-white text-2xl font-bold">+</div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Login to your Account</h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border w-full px-4 py-2 mb-4 rounded"
              maxLength={10}
            />
            <button
              onClick={requestOtp}
              className="w-full bg-blue-600 text-white py-2 rounded mb-4"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border w-full px-4 py-2 mb-4 rounded"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded mb-4"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
