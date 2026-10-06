import "./SignUp.css";
import {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function Login() {
 const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('')

const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(username, password)
 axios.post('https://mern-chat-backend-xj0t.onrender.com/api/auth/Login',  {username, password}, {
   withCredentials: true
 })
    .then((msg)=>{
      console.log(msg)
      if(msg.data.message === 'successfull'){
        window.alert(msg.data.message)
       navigate('/')
      }
     if(msg.data.message !== 'successfull'){
       window.alert(msg.data.message)
     }
    });


}


  
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Login</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form>
          <div className="input-group">
            <label>Username</label>
            <input onChange={
              
            (e)=>setUsername(e.target.value.replace(/\s/g, ""))}
              type="text"
              placeholder="Enter username"
            />
          </div>

          

          <div className="input-group">
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value.replace(/\s/g, ""))}
              type="password"
              placeholder="Enter password"
            />
          </div>

          <button onClick={(e)=>{
      handleSubmit(e)
          }} type="submit" className="signup-btn">
            Login
          </button>
        </form>

        <p className="login-text">
          Dont have any account? <span onClick={()=>{
      navigate('/SignUp')
          }}>SignUp</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
