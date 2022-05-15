import { createSignal, createEffect } from 'solid-js';
const LOCAL_STORAGE_KEY = 'todos-solid';

function createLocalState(value) {
  // load stored todos on init
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY),
    [state, setState] = createSignal(
      stored ? JSON.parse(stored) : value
    );
  
  // JSON.stringify creates deps on every iterable field
  createEffect(() =>
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(state)
  ));
  return [state, setState];
}
export default createLocalState;
