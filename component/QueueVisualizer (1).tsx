import React from 'react';
import { OrderNode } from '../types';
import { Users, ArrowRight } from 'lucide-react';

interface QueueVisualizerProps {
  queue: OrderNode[];
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ queue }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-blue-500" /> Queue Structure
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Size: {queue.length}
        </span>
      </div>

      {queue.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Users size={48} className="mb-2 opacity-20" />
          <p>No customers in line</p>
        </div>
      ) : (
        <div className="flex items-center overflow-x-auto pb-4 gap-2">
          {queue.map((node, index) => (
            <div key={node.customerNo} className="flex items-center shrink-0">
               {/* Node Visualization */}
              <div className={`relative flex flex-col w-40 p-4 rounded-xl border-2 transition-all duration-300 ${
                index === 0 
                  ? 'border-green-500 bg-green-50 shadow-md scale-105' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                {index === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded shadow-sm">
                    HEAD
                  </span>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-500 text-xs">NO.</span>
                  <span className="font-mono font-bold text-lg text-gray-800">#{node.customerNo}</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2 truncate">
                  {node.items.map(i => i.name).join(', ')}
                </div>
                
                <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between text-sm">
                  <span className="text-gray-400">Total</span>
                  <span className="font-bold text-gray-800">฿{node.totalAmount}</span>
                </div>
              </div>

              {/* Arrow Connector (Pointer to next) */}
              {index < queue.length - 1 && (
                <div className="mx-2 text-gray-300 flex flex-col items-center justify-center">
                   <div className="h-0.5 w-4 bg-gray-300"></div>
                   <ArrowRight size={16} className="-ml-1" />
                </div>
              )}
               
               {/* Tail Indicator */}
               {index === queue.length - 1 && (
                 <div className="ml-2 text-xs font-mono text-gray-400 border border-gray-200 px-2 py-1 rounded bg-gray-50">
                    NULL
                 </div>
               )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-xs font-mono text-gray-500 bg-gray-900 p-3 rounded-lg overflow-hidden">
        <p className="text-green-400 mb-1">// Memory Visualization</p>
        <p>struct Queue &#123;</p>
        <p className="pl-4">head: {queue.length > 0 ? `0x...${queue[0].customerNo}` : 'NULL'};</p>
        <p className="pl-4">tail: {queue.length > 0 ? `0x...${queue[queue.length-1].customerNo}` : 'NULL'};</p>
        <p className="pl-4">size: {queue.length};</p>
        <p>&#125;</p>
      </div>
    </div>
  );
};