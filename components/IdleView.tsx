
import React from 'react';
import { HistoryItem } from '../types';

interface IdleViewProps {
  counter: number;
  history: HistoryItem[];
  onCreateClick: () => void;
}

const IdleView: React.FC<IdleViewProps> = ({ counter, history, onCreateClick }) => {
  return (
    <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
      {/* Counter Display */}
      <div className="mb-12 text-center">
        <span className="text-8xl font-black tracking-tighter tabular-nums leading-none">
          {counter}
        </span>
        <p className="text-xs uppercase tracking-[0.2em] font-medium mt-2 opacity-50">Tasks Done Today</p>
      </div>

      {/* Plus Icon - Main Call to Action */}
      <button 
        onClick={onCreateClick}
        aria-label="Create new task"
        className="group relative w-20 h-20 border-2 border-black flex items-center justify-center hover:bg-black transition-all duration-200 focus:outline-none"
      >
        <div className="w-8 h-0.5 bg-black group-hover:bg-white transition-colors duration-200 absolute"></div>
        <div className="w-8 h-0.5 bg-black group-hover:bg-white transition-colors duration-200 rotate-90 absolute"></div>
      </button>

      <p className="mt-6 text-sm opacity-60 font-light italic">Start something new</p>

      {/* History List - Simple Vertical List */}
      {history.length > 0 && (
        <div className="mt-16 w-full max-w-xs">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-40 border-b border-black pb-1">
            Recent History
          </h3>
          <ul className="space-y-3">
            {history.map((item) => (
              <li 
                key={item.id} 
                className="text-sm font-medium flex items-start animate-in slide-in-from-bottom-2 duration-300"
              >
                <span className="mr-3 mt-1.5 w-1 h-1 bg-black rounded-full shrink-0"></span>
                <span className="break-words leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdleView;
