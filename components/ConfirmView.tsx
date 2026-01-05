
import React from 'react';

interface ConfirmViewProps {
  taskText: string;
  onYes: () => void;
  onNo: () => void;
}

const ConfirmView: React.FC<ConfirmViewProps> = ({ taskText, onYes, onNo }) => {
  return (
    <div className="w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-sm uppercase tracking-widest font-bold opacity-40 mb-8">
        Finish this task?
      </h2>
      
      <div className="mb-12 px-4">
        <p className="text-3xl font-black leading-tight break-words">
          "{taskText}"
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={onYes}
          className="w-full py-5 bg-black text-white text-lg font-black uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.98]"
        >
          YES
        </button>
        
        <button
          onClick={onNo}
          className="w-full py-5 text-lg font-black uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-all duration-200 active:scale-[0.98]"
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default ConfirmView;
