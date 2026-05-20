'use client';
import { AppShell } from '@/components/AppShell';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Loans() {
  const [loans, setLoans] = useState<any[]>([]);
  const [f, setF] = useState({
    amount: '',
    interestRate: '',
    monthlyPayment: '',
    remainingBalance: '',
  });

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch('/api/loans');
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        toast.error('Зээл ачаалахад алдаа гарлаа');
      }
    };
    fetchLoans();
  }, []);

  const addLoan = async () => {
    await fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(f.amount),
        interestRate: Number(f.interestRate),
        monthlyPayment: Number(f.monthlyPayment),
        remainingBalance: Number(f.remainingBalance),
      }),
    });

    toast.success('Зээл нэмэгдлээ ✅');
    setLoans([...loans, f]);
    setF({
      amount: '',
      interestRate: '',
      monthlyPayment: '',
      remainingBalance: '',
    });
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Зээлийн удирдлага</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
            <input
              className="p-3 rounded-xl border"
              placeholder="Зээлийн дүн"
              value={f.amount}
              onChange={(e) => setF({ ...f, amount: e.target.value })}
            />
            <input
              className="p-3 rounded-xl border"
              placeholder="Хүү %"
              value={f.interestRate}
              onChange={(e) => setF({ ...f, interestRate: e.target.value })}
            />
            <input
              className="p-3 rounded-xl border"
              placeholder="Сарын төлбөр"
              value={f.monthlyPayment}
              onChange={(e) => setF({ ...f, monthlyPayment: e.target.value })}
            />
            <input
              className="p-3 rounded-xl border"
              placeholder="Үлдэгдэл"
              value={f.remainingBalance}
              onChange={(e) => setF({ ...f, remainingBalance: e.target.value })}
            />

            <button
              onClick={addLoan}
              className="md:col-span-2 bg-black text-white rounded-xl p-3"
            >
              + Зээл нэмэх
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Зээлийн жагсаалт</h2>

          {loans.length === 0 ? (
            <p className="text-gray-500">Одоогоор зээл бүртгэгдээгүй байна.</p>
          ) : (
            <div className="space-y-3">
              {loans.map((loan, i) => (
                <div key={i} className="border rounded-xl p-4">
                  <p>Дүн: {loan.amount}₮</p>
                  <p>Хүү: {loan.interestRate}%</p>
                  <p>Сарын төлбөр: {loan.monthlyPayment}₮</p>
                  <p>Үлдэгдэл: {loan.remainingBalance}₮</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
