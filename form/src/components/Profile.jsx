import "./Profile.css";
import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Profile() {
  const navigate = useNavigate();
  const [load, setLoad]= useState(false)
  const [user, setUser] = useState([])


  const handleLogout = ()=>{

    axios.get('http://localhost:3000/api/auth/Logout', {withCredentials: true}).then((data)=>{
      if(data.status===200){
        alert(data.data.message)
        navigate('/Login')
      }
    })
  }

  useEffect(()=>{

  

    axios.get('http://localhost:3000/api/auth/Home', {withCredentials: true}).then((data)=>{
      console.log(data)
      setUser(data.data)
    }).catch((err)=>{
      console.log(err)
      if(err.status === 401){
        
        console.log('Login required')
        
        navigate('/Login')
      }
    })
      
    
    
  }, [load])



  







  
  return (
    <div className="home-page">
      <div className="profile-card">
        <div className="profile-icon">👤</div>

        <h2>Welcome Home</h2>
        <p className="subtitle">Your Account Details</p>

        <div className="user-field">
          <span>Username</span>
          <strong>{user.username}</strong>
        </div>

        <div className="user-field">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="user-field">
          <span>Password</span>
          <strong>{user.password}</strong>
        </div>
        <button className="logout-btn" onClick={()=>{
      handleLogout()
        }}>
  Logout
</button>
      </div>
      
        
      
    </div>
  );
}

export default Profile;