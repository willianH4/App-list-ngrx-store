export interface CounterState {
  counter: number;
  activity:    string;
}

export const initialState: CounterState = {
  counter: 4,
  activity: 'Practice NgRX store'
}
