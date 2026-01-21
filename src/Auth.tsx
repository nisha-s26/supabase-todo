import React, { useState } from 'react'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    return (
        <div>
            <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        </div>
    )
}

export default Auth