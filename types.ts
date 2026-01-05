
export enum AppView {
  IDLE = 'IDLE',
  CREATING = 'CREATING',
  CONFIRMING = 'CONFIRMING'
}

export interface HistoryItem {
  id: string;
  text: string;
  completedAt: number; // Timestamp
}

export interface AppState {
  view: AppView;
  currentTask: string;
  counter: number;
  history: HistoryItem[];
}
