import { useEffect, useState } from "react"
import supabase from "./utils/supabase"

type Todo = {
  id: number;
  title: string;
  description: string
}

const Todo = () => {
  const [editId, setEditId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")

  async function getTodos() {
    const { data, error } = await supabase.from('todos').select("*")
    if (data) {
      setTodos(data)
    } else {
      throw new Error("data not found", error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (isEdit) {
      handleEdit()
    } else {
      handleAdd()
    }

  }
  const handleAdd = async () => {
    const { data, error } = await supabase.from("todos").insert([
      { title: title, description: desc }
    ]).single()
    if (error) {
      throw new Error("error occured while inserting todo", error)
    }
    getTodos()
    setTitle("")
    setDesc("")
    return data
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id)
    if (error) {
      throw new Error("error", error)
    }
    getTodos()
  }

  const handleEdit = async () => {
    console.log(editId)
    const { error } = await supabase.from("todos").update({ title:title, description: desc }).eq("id", editId)
    if (error) {
      throw new Error("Error while updating")
    }
    getTodos()
    setIsEdit(false)
    setTitle("")
    setDesc("")
    setEditId(0)
  }

  return (
    <div>
      <h1>todos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>
      <div>
        {todos.map((val: Todo) => {
          return (
            <div key={val.id}>
              <p>{val.title} :</p>
              <p>{val.description}</p>
              <button onClick={() => {
                setIsEdit(true)
                setEditId(val.id)
                setTitle(val.title)
                setDesc(val.description)
              }}>Edit</button>
              <button onClick={() => handleDelete(val.id)}>Delete</button>
              <hr />
            </div>
          )
        })}
      </div>

      <button onClick={() => supabase.auth.signOut()}>Log Out</button>
    </div>
  )
}

export default Todo