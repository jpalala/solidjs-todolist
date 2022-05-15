import createLocalState from '../todos-localstate';
import {createEffect} from 'solid-js';
function createTodosStore() {
  const [state, setState] = createLocalState({
    counter: 1, todos: [], showMode: 'all'
  });
  createEffect(() => {
    const completedCount = state.todos.filter(
      todo => todo.completed
    ).length;
    setState({
      completedCount,
      remainingCount: state.todos.length - completedCount
    });
  });
  return [
    state, {
    addTodo: ({title}) => setState(
      ['todos', t => 
        [{title, id: state.counter, completed: false}, ...t]
      ],
      ['counter', c => c + 1]
    ),
    removeTodo: todoId => setState('todos',
      t => t.filter(item => item.id !== todoId)
    ),
    editTodo: todo => setState(
      'todos',
      state.todos.findIndex(item => item.id === todo.id), 
      todo
    ),
    clearCompleted: () => setState(
      'todos', t => t.filter(todo => !todo.completed)
    ),
    toggleAll: completed => setState(
      'todos', todo => todo.completed !== completed, {completed}
    ),
    setVisibility: showMode => setState('showMode', showMode)
  }];
}
export default createTodosStore;
