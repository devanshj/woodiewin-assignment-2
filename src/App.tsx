import { useState } from "react"

type Todo = {
  id: number,
  title: string,
  isCompleted: boolean
}

const App = () => {
  let [newTodoTitle, setNewTodoTitle] = useState("")
  let [todos, setTodos] = useState([] as Todo[])

  return <div className="max-w-[300px] mx-[auto]">
    <h1 className="mt-2 text-xl font-semibold">Todos</h1>
    <form
      onSubmit={e => {
        e.preventDefault()
        setTodos(ts => [...ts, { id: Math.random(), title: newTodoTitle, isCompleted: false }])
        setNewTodoTitle("")
      }}
      className="mt-2 flex">
        <input
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          className="flex-1 border border-slate-300 px-2 py-1 border-r-[0] focus:outline-slate-400 rounded rounded-r-[0]" type="text" placeholder="Title"/>
        <button className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2 py-1 rounded rounded-l-[0]">Add</button>
    </form>
    <div className="mt-2">{
      todos.map(todo =>
        <Todo
          key={todo.id}
          value={todo}
          onChange={todo => {
            todos.splice(todos.findIndex(t => t.id === todo.id), 1, todo)
            setTodos([...todos])
          }}
          onDelete={() => {
            todos.splice(todos.findIndex(t => t.id === todo.id), 1)
            setTodos([...todos])
          }}/>
      )
    }</div>
    <div className="text-sm mt-2 flex items-center justify-between">
      <span>{todos.filter(t => t.isCompleted).length} / {todos.length} Completed</span>
      <button
        onClick={() => {
          setTodos(ts => ts.filter(t => !t.isCompleted))
        }}
        className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-1 py-0.5 rounded">Clear Completed</button>
    </div>
  </div>
}

type TodoProps = {
  value: Todo,
  onChange: (t: Todo) => void,
  onDelete: () => void
}

const Todo = ({ value, onChange, onDelete }: TodoProps) => {
  return <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={value.isCompleted}
      onChange={e => onChange({ ...value, isCompleted: e.target.checked })} />
    <span>{value.title}</span>
    <button onClick={onDelete}>&times;</button>
  </label>
}

export default App
