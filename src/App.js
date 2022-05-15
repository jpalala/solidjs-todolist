import logo from './logo.svg';
import createTodosStore from './stores/todos-create-store';

import './App.css';
const TodoHeader = ({ addTodo }) => (
  <header class='header'>
    <h1>todos</h1>
    <input
      class='new-todo'
      placeholder='What needs to be done?'
      onKeyUp={({target, keyCode}) => {
        let title;
        if (!(keyCode === ENTER_KEY
          && (title = target.value.trim()))) return;
        addTodo({title});
        target.value = '';
      }}
    />
  </header>
);

const TodoFooter = ({ store, clearCompleted }) => (
  <footer class='footer'>
    <span class='todo-count'>
      <strong>{(store.remainingCount)}</strong>
      {(store.remainingCount === 1 ? ' item' : ' items')} left
    </span>
    <nav>
      <ul class='filters'>
        <li><a
          href='#/'
          classList={({selected: store.showMode === 'all'})}
        >All</a></li>
        <li><a
          href='#/active'
          classList={({selected: store.showMode === 'active'})}
        >Active</a></li>
        <li><a
          href='#/completed'
          classList={({selected: store.showMode === 'completed'})}
        >Completed</a></li>
      </ul>
    </nav>
    <Show when={(store.completedCount > 0)}>
      <button
        class='clear-completed'
        onClick={clearCompleted}
      >Clear completed</button>
    </Show>
  </footer>
);

function App() {
  const [store, {
    addTodo, toggleAll, editTodo, 
    removeTodo, clearCompleted, setVisibility
  }] = createTodosStore(),
  locationHandler = () =>
    setVisibility(location.hash.slice(2) || 'all'
  );

  window.addEventListener('hashchange', locationHandler);
  onCleanup(() =>
    window.removeEventListener('hashchange', locationHandler)
  );
  return (
    <div>
      <section class='todoapp'>
        <TodoHeader addTodo={addTodo} />
        <Show when={(store.todos.length > 0)}>
          <TodoList {...{store, toggleAll, editTodo, removeTodo}}/>
        </Show>
      </section>
      <Show when={(store.todos.length > 0)}>
        <TodoFooter store={store} clearCompleted={clearCompleted} /> 
      </Show>
    </div>
    )
}

export default App;
