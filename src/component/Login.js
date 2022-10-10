import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login =()=>{
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        let result = await fetch("http://localhost:4000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        } else {
            alert("Please enter connect details")
        }
    }

    return(
        <div className='login'>
            <input type="text" className="inputBox" placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <input type="password" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handleLogin} className='app-Button' type='button'>Login</button>
        </div>
    )
}
export default Login;