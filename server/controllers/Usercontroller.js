const Todo = require('../models/Todomodel.js');
const User = require('../models/Usermodel.js')
const jwt = require('jsonwebtoken')
const Message = require('../models/Message.js')
//const {io, userSocketMap} = require('../server.js')

require('dotenv').config()
const SignUp = async(req, res)=>{
  
  try{
    const {username, email, password} = req.body;

    
    console.log(username, email, password)

    if(username==='' || password==='' || email ===''){
      res.send({message: 'Please enter credintial'})
    }else{
      User.create({username, email, password})
      res.send({message:'successfull'})
    }
    
  }catch(error){
    console.log(error)
    
  }
}

const Login = async (req, res)=>{
try{
  const {username, password} = req.body;
  console.log(username, password)
  if(username==='' || password===''){

    res.send({message:'Enter Login information'})
    
  }else{

    const user = await User.findOne({ username, password });
    if(!user){
      return res.json({message: 'Invalid Username or password'})
      
      
    }else{
      const token = jwt.sign({userId: user._id}, process.env.SECRET, { expiresIn: '1d' }  )
      console.log(token)

    res.cookie('token', token,{
        
        maxAge: 24 * 60 * 60 * 1000
      })


return (res.status(200).json({message:'successfull', token: token}));


  
    

      
    }
    
  }




  
}catch(err){
  
}

  
}


const Logout = (req, res)=>{
res.clearCookie('token')
  res.status(200).json({message: 'Logout Successfull'} )
  
}











const fetchData = async(req, res)=>{

  try{
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded)

    const userData = await User.findById(decoded.userId)
    if(!userData){
      res.status(404).json({message: 'User not found'})
    }

    res.status(200).json(userData)
    
  }catch(err){
    
  }
  
}

const getAllUser = async(req, res)=>{
try{
  const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.SECRET)
  const userId = decoded.userId
  console.log(decoded.userId)

 const filteredUser= await User.find({_id:{$ne: decoded.userId}})
  console.log(filteredUser)
  if(!filteredUser){
    res.status(400).json({message:'users not found'})
  }
  return res.status(200).json({userId, filteredUser})
  
}catch(err){
return  console.log(err)
  
}
  
}


const userData = async (req, res)=>{
  try{
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET)
  const userId = decoded.userId
    const {receiverId} = req.body
    console.log(receiverId)
  const users = await User.find({_id:receiverId })
console.log(users)
  res.status(200).json({userId, users})
  }catch(err){
    console.log(err)
  }
}

const sendMsg = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const token = req.cookies.token;

    // 1. Token Check
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    // 2. Decode JWT
    const decoded = jwt.verify(token, process.env.SECRET);

    // 3. Save Message in MongoDB
    const msg = await Message.create({
      senderId: decoded.userId,
      receiverId: receiverId,
      text: message
    });

    if (!msg) {
      return res.status(400).json({ message: "Error while creating msg document" });
    }
res.json(msg)


    
    const io = req.app.get('io');
    const userSocketMap = req.app.get('userSocketMap');
const receiverSocketId = userSocketMap[receiverId]
    console.log('helo Khurshid', receiverSocketId)

    io.to(receiverSocketId).emit("newMessage", msg);

    // 4. Safe Real-time Socket Emit (Crash-proof)

    

  } catch (err) {
    console.log("Error in sendMsg:", err);
    return res.status(500).json({ error: err.message });
  }
};







const fetchMsg = async(req, res)=>{
  try{
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.SECRET)

  const senderId = decoded.userId;

  const {receiverId} = req.body



  const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
  if(!messages){
    console.log('error while fetching message')
    res.status(404).json({message: 'messages not found'})
  }

  console.log('message fetch successfull')

  res.status(200).json(messages)
    
  }catch(err){

console.log(err)

    
  }
}










module.exports = {SignUp,getAllUser, Login, Logout, fetchData, userData, sendMsg, fetchMsg};

