
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppView, HistoryItem } from './types';
import IdleView from './components/IdleView';
import CreateView from './components/CreateView';
import ConfirmView from './components/ConfirmView';

const HISTORY_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export default function App() {
  // State management: No persistence (local state only)
  const [view, setView] = useState<AppView>(AppView.IDLE);
  const [currentTask, setCurrentTask] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 1. History Expiration Logic
  // We use a periodic check (every second) to prune the history list
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      setHistory(prevHistory => {
        const filtered = prevHistory.filter(item => (now - item.completedAt) < HISTORY_EXPIRY_MS);
        // Only update if lengths differ to avoid unnecessary re-renders
        return filtered.length !== prevHistory.length ? filtered : prevHistory;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 2. State Transition Handlers
  const handleStartCreation = useCallback(() => {
    setView(AppView.CREATING);
  }, []);

  const handleTaskSubmit = useCallback((task: string) => {
    setCurrentTask(task);
    setView(AppView.CONFIRMING);
  }, []);

  const handleConfirmYes = useCallback(() => {
    const newHistoryItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: currentTask,
      completedAt: Date.now(),
    };

    setCounter(prev => prev + 1);
    setHistory(prev => [newHistoryItem, ...prev]);
    setCurrentTask('');
    setView(AppView.IDLE);
  }, [currentTask]);

  const handleConfirmNo = useCallback(() => {
    setView(AppView.CREATING);
  }, []);

  // 3. Render logic based on view state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black transition-colors duration-300">
      <div className="w-full max-w-md flex flex-col items-center">
        {view === AppView.IDLE && (
          <IdleView 
            counter={counter} 
            history={history} 
            onCreateClick={handleStartCreation} 
          />
        )}

        {view === AppView.CREATING && (
          <CreateView 
            initialValue={currentTask}
            onDone={handleTaskSubmit}
            onCancel={() => setView(AppView.IDLE)}
          />
        )}

        {view === AppView.CONFIRMING && (
          <ConfirmView 
            taskText={currentTask} 
            onYes={handleConfirmYes} 
            onNo={handleConfirmNo} 
          />
        )}
      </div>
    </div>
  );
}
