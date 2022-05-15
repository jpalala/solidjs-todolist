const TodoList = ({ store, editTodo, removeTodo, toggleAll }) => {
  const [state, setState] = createState(),
    filterList = todos => {
      if (store.showMode === 'active')
        return todos.filter(todo => !todo.completed);
      else if (store.showMode === 'completed')
        return todos.filter(todo => todo.completed);
      else return todos
    },
    isEditing = todoId => state.editingTodoId === todoId,
    setCurrent = todoId => setState('editingTodoId', todoId),
    save = ({target: {value}}, todoId) => {
      let title;
      if (!(state.editingTodoId === todoId
        && (title = value.trim()))) return;
      editTodo({id: todoId, title});
      setCurrent();
    },
    toggle = ({target: {checked}}, todoId) =>
      editTodo({id: todoId, completed: checked})
    ,
    edit = (e, todoId) => setCurrent(todoId),
    remove = (e, todoId) => removeTodo(todoId),
    doneEditing = (e, todoId) => {
      if (e.keyCode === ENTER_KEY) save(e, todoId);
      else if (e.keyCode === ESCAPE_KEY) setCurrent();
    };

  return <section class='main'>
    <input
      id='toggle-all'
      class='toggle-all'
      type='checkbox'
      checked={(!store.remainingCount)}
      onInput={({target: {checked}}) => toggleAll(checked)}
    />
    <label for='toggle-all' />
    <ul class='todo-list'>
      <For each={(filterList(store.todos))}
       transform={selectWhen(
          () => state.editingTodoId, 'editing'
        )}
      >{
        todo => <TodoItem {...{
          todo, isEditing, toggle, edit,
          remove, doneEditing, save}
        } />
      }</For>
    </ul>
  </section>
}
export default TodoList;