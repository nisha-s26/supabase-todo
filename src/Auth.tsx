import { useState } from 'react'
import supabase from './utils/supabase'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        if(isSignUp){
            // sign up logic
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            })  
            if(error){
                throw new Error("error occured during sign up", error)
            }  
            
            console.log("sign up data", data) 
        } else {
            // log in logic
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })  
            if(error){
                throw new Error("error occured during log in", error)
            }
            console.log("log in data", data)
        }
    }
    return (
        <div>
            <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type='email' placeholder='enter the email' />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type='password' placeholder='enter the password' />
                <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>Switch to {isSignUp ? "Log In" : "Sign Up"}</button>
        </div>
    )
}

export default Auth