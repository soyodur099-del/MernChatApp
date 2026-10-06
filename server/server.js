const express = require('express');
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const cookie = require('cookie'); // Top par zaroor add karein!


const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

const userSocketMap = {};

app.set('io', io);
app.set('userSocketMap', userSocketMap);
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId
  console.log('I am a user id ', userId)
  userSocketMap[userId] = socket.id;
  console.log('i am socket Id ', userSocketMap)

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("User disconnected:", socket.id);
  });
});


const URI = 'mongodb+srv://soyodur099_db_user:xhq6ZKWTh2sblqdN@cluster0.4jilrop.mongodb.net/UserData';


//user schema







app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}
))
app.use(cookieParser())

app.use('/api/auth', authRoutes)





httpServer.listen(3000, async ()=>{

try{
  
  await mongoose.connect(URI)
  console.log('Connected to Database')

  console.log('server started at 3000')




    
   }catch(err){

  console.log(err, 'error occured')
   }
  
  
})


module.exports = {userSocketMap, io}