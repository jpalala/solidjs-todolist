
const TodoItem = ({ todo, isEditing, toggle, edit, remove, save, doneEditing }) => (
  <li
    class='todo'
    model={todo.id}
    classList={({completed: todo.completed})}
  >
    <div class='view'>
      <input
        class='toggle'
        type='checkbox'
        checked={(todo.completed)}
        onInput={toggle}
      />
      <label onDblClick={edit}>{(todo.title)}</label>
      <button class='destroy' onClick={remove} />
    </div>
    <Show when={(isEditing(todo.id))}>
      <input
        class='edit'
        value={todo.title}
        onFocusOut={save}
        onKeyUp={doneEditing}
        forwardRef={el => Promise.resolve().then(() => el.focus())}
      />
    </Show>
  </li>
);
export default TodoItem;