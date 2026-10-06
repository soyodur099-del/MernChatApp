import "./SignUp.css";
import {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(username, email, password)
 axios.post('http://localhost:3000/api/auth/SignUp',  {username, email, password})
    .then((msg)=>{
      if(msg.data.message==='successfull'){
        navigate('/Login')
      }

      
     window.alert(msg.data.message)
    });


}


  
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form>
          <div className="input-group">
            <label>Username</label>    <input onChange={
              
            (e)=>setUsername(e.target.value.replace(/\s/g, ""))}
              type="text"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input onChange={(e)=>setEmail(e.target.value.replace(/\s/g, ""))}
              type="email"
              placeholder="Enter email"
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
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account? <span onClick={()=>{
      navigate('/Login')
          }}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;