import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3501//createPost',
      data: {
        name: username,
        password
      }
    })
    console.log(result);
    if(result){
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <input type="text" value={username} onChange={e=> setUsername(e.target.value)} placeholder='Enter username' />
      <br/>
      <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder='Enter password' />
      <br />
      <button type="submit">Signup</button>
    </form>
  )
}

export default CreateUser
