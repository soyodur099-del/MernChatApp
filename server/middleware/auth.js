require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = (req, res, next)=>{

  const token = req.cookies.token
  if(!token){
    console.log('token not found login again')
    res.status(401).json({message:'Login require'})
  }

  
    
  

  
  next()
}

module.exports = auth