import React, { useState, useEffect } from 'react';
import { OrderNode } from '../types';
import { CreditCard, Banknote, CheckCircle, AlertCircle } from 'lucide-react';

interface CashierStationProps {
  currentOrder: OrderNode | null;
  onPaymentComplete: (amountPaid: number, change: number) => void;
}

export const CashierStation: React.FC<CashierStationProps> = ({ currentOrder, onPaymentComplete }) => {
  const [inputCash, setInputCash] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Reset state when a new customer arrives at the counter
    setInputCash('');
    setError(null);
    setIsProcessing(false);
  }, [currentOrder?.customerNo]);

  if (!currentOrder) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-700">Cashier Closed</h3>
        <p className="text-gray-500">Waiting for next customer...</p>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cash = parseInt(inputCash);
    
    if (isNaN(cash)) {
      setError('Please enter a valid amount');
      return;
    }

    if (cash < currentOrder.totalAmount) {
      setError(`Insufficient funds. Need ฿${currentOrder.totalAmount - cash} more.`);
      return;
    }

    setIsProcessing(true);
    const change = cash - currentOrder.totalAmount;
    
    // Simulate slight delay for effect
    setTimeout(() => {
        onPaymentComplete(cash, change);
    }, 600);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
        <div>
           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">🏪</span> Cashier Station
          </h2>
          <p className="text-sm text-gray-500">Processing Customer #{currentOrder.customerNo}</p>
        </div>
        <div className="text-right">
             <div className="text-sm text-gray-500">Total Due</div>
             <div className="text-3xl font-bold text-orange-600">฿{currentOrder.totalAmount}</div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {/* Receipt Preview */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm font-mono">
            <div className="flex justify-between border-b border-gray-200 pb-2 mb-2 text-gray-500">
                <span>Item</span>
                <span>Price</span>
            </div>
            {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span>฿{item.price}</span>
                </div>
            ))}
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold text-gray-800">
                <span>TOTAL</span>
                <span>฿{currentOrder.totalAmount}</span>
            </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="mt-6">
        <form onSubmit={handlePayment}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Received Cash
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Banknote className="text-gray-400" size={18} />
                </div>
                <input
                    type="number"
                    value={inputCash}
                    onChange={(e) => {
                        setInputCash(e.target.value);
                        setError(null);
                    }}
                    disabled={isProcessing}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-lg"
                    placeholder="Enter amount..."
                    autoFocus
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">THB</span>
                </div>
            </div>

            {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!inputCash || isProcessing}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white transition-all
                ${!inputCash || isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
            >
                {isProcessing ? 'Processing...' : (
                    <>
                        <CheckCircle size={20} /> Confirm Payment
                    </>
                )}
            </button>
        </form>
      </div>
    </div>
  );
};