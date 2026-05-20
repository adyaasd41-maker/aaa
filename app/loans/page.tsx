'use client';

import { AppShell } from '@/components/AppShell';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Loans() {
  const [loans, setLoans] = useState<any[]>([]);
  const [f, setF] = useState({
    name: 'Ипотекийн зээл',
    principal: '',
    annualRate: '',
    months: '',
    startDate: '',
  });

  const loadLoans = async () => {
    try {
      const res = await fetch('/api/loans');
      const data = await res.json();
      setLoans(data);
    } catch (error) {
      console.error(error);
      toast.error('Зээл ачааллахад алдаа гарлаа');
    }
  };

  // ⚠️ Vercel build error зассан useEffect
  useEffect(() => {
    loadLoans();
  }, []);

  const createLoan = async () => {
    try {
      const res = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...f,
          principal: Number(f.principal),
          annualRate: Number(f.annualRate),
          months: Number(f.months),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

      toast.success('Зээл амжилттай нэмэгдлээ');
      setF({
        name: 'Ипотекийн зээл',
        principal: '',
        annualRate: '',
        months: '',
        startDate: '',
      });
      loadLoans();
    } catch (error) {
      console.error(error);
      toast.error('Зээл нэмэхэд алдаа гарлаа');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">🏠 Зээлийн тооцоолуур</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow">
          <input
            className="border rounded-lg p-3"
            placeholder="Зээлийн нэр"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Үндсэн дүн"
            value={f.principal}
            onChange={(e) => setF({ ...f, principal: e.target.value })}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Жилийн хүү (%)"
            value={f.annualRate}
            onChange={(e) => setF({ ...f, annualRate: e.target.value })}
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Хугацаа (сар)"
            value={f.months}
            onChange={(e) => setF({ ...f, months: e.target.value })}
          />

          <input
            type="date"
            className="border rounded-lg p-3"
            value={f.startDate}
            onChange={(e) => setF({ ...f, startDate: e.target.value })}
          />

          <button
            onClick={createLoan}
            className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700"
          >
            ➕ Зээл нэмэх
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Миний зээлүүд</h2>

          {loans.length === 0 ? (
            <p className="text-gray-500">Одоогоор зээл бүртгэгдээгүй байна.</p>
          ) : (
            <div className="space-y-3">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{loan.name}</p>
                    <p className="text-sm text-gray-500">
                      {loan.principal?.toLocaleString()} ₮
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {loan.annualRate}% / {loan.months} сар
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
