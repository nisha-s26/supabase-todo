import { useEffect, useState } from "react"
import Auth from "./Auth"
import Todo from "./Todo"
import supabase from "./utils/supabase"

const App = () => {
  const [session, setSession] = useState<any>(null)
  const fetchSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setSession(session)
  }
  useEffect(() => {
    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <div>
      {session ? <Todo /> : <Auth />}
    </div>
  )
}

export default App

