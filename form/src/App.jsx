import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx'
import Chat from './components/Chat.jsx'

import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'

function App() {
  const { receiverId } = useParams();

     return(<BrowserRouter>
     <Routes>
     <Route path='/SignUp' element={<SignUp/>} />
            <Route path='/' element={<Home/>} />
       <Route path='/Login' element={<Login/>} />
       <Route path='/chat/:receiverId' element={<Chat/>} />
       
     <Route path='/profile' element={<Profile/>} />
     </Routes>
     
     
     </BrowserRouter>)
  
}

export default App
