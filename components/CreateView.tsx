
import React, { useState, useEffect, useRef } from 'react';

interface CreateViewProps {
  initialValue: string;
  onDone: (task: string) => void;
  onCancel: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({ initialValue, onDone, onCancel }) => {
  const [taskText, setTaskText] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDone = () => {
    if (taskText.trim()) {
      onDone(taskText.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && taskText.trim()) {
      handleDone();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const isDisabled = !taskText.trim();

  return (
    <div className="w-full animate-in zoom-in-95 duration-200">
      <div className="flex flex-col gap-8 w-full">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-1">
            What will you do?
          </label>
          <input
            ref={inputRef}
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your task..."
            className="w-full text-2xl font-bold bg-transparent border-b-2 border-black py-4 px-1 focus:outline-none placeholder:opacity-20"
          />
        </div>

        <button
          onClick={handleDone}
          disabled={isDisabled}
          className={`
            w-full py-6 text-xl font-black uppercase tracking-widest border-2 border-black transition-all duration-200
            ${isDisabled 
              ? 'opacity-10 cursor-not-allowed' 
              : 'hover:bg-black hover:text-white active:scale-[0.98]'
            }
          `}
        >
          DONE
        </button>
        
        <button 
          onClick={onCancel}
          className="text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 transition-opacity"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateView;
