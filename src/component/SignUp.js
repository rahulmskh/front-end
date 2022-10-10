import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const  SignUp=()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate("/")
    }
   })

  const collectData = async () => {
    console.log(name, email, password)
    //const user  = JSON.stringify( {...{email, password, name}})
    //console.log(user);
    // await axios.post('http://localhost:4000/register',{email, password, name}).then(response => console.log(response))
    let result = await fetch('http://localhost:4000/register', {
      method: 'post',
      body: JSON.stringify({name,email,password}),
      headers:{
        'Content-Type': 'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth))
      navigate("/");
  }
  return (
    <div >
      <h2 className='register'>Register</h2>
      <input className="inputBox" type="text" placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input className="inputBox" type="text" placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className="inputBox" type="password" placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={collectData} className='app-Button' type='button'>SignUp</button>
    </div>
  )
}

export default SignUp;