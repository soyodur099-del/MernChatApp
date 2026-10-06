import "./Home.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState([])

  






  const fetchUser = async ()=>{

    await axios.get('http://localhost:3000/api/auth/getUser', {withCredentials: true}).then((data)=>{
      if(data.status===200){
        console.log(data)
        setUser(data.data.filteredUser)
        
      
      }
    }).catch((err)=>{
      if(err.status ===401){
        navigate('/Login')
      }
    })
  }

  useEffect(()=>{
    fetchUser()
    
  }, [])

  return (
    <div className="home">

      <header className="home-header">
        <div>
          <h2>Messages</h2>
          <p>Stay connected with everyone</p>
        </div>

        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
          title="Profile"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="search-box">
        <span>⌕</span>
        <input type="text" placeholder="Search people..." />
      </div>

      <section className="users-section">
        <h3>People</h3>

        {/* Apna users ka map yahan add karna */}

        
        {user.map((user)=>(
      <div className="user-card" onClick={() => navigate(`/chat/${user._id}`)}>
          <div className="avatar avatar-orange">{user.username[0].toUpperCase()}</div>

          <div className="user-info">
            <h4>{user.username}</h4>
            <p>Tap to start chatting</p>
          </div>

          <span className="online-dot"></span>
        </div>
        ))}
        

        

      </section>
    </div>
  );
}

export default Home;