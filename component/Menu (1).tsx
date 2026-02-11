import React from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../constants';
import { Plus } from 'lucide-react';

interface MenuProps {
  onAddItem: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddItem }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📋</span> Menu Selection
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onAddItem(item)}
            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {item.emoji}
            </div>
            <div className="font-semibold text-gray-700">{item.name}</div>
            <div className="text-orange-600 font-bold">฿{item.price}</div>
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-500 text-white p-1 rounded-full">
              <Plus size={16} />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-400 text-center">
        Click items to add to the current order basket
      </div>
    </div>
  );
};