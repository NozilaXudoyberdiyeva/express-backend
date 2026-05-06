import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

let route = express.Router()


route.post("/register", async (req, res) => {
   try{
     let {username, email, password, role} = req.body

    let eUser = await User.findOne({email})

    // validation

    if(eUser){
       return res.status(400).send({ message: "This user already exist" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role
    })

   return res.send({message: "User created", userId: user._id})
   }catch(err) {
   return res.send({ message: err.message });
   }

})

route.post("/login", async (req, res) => {
    let {email, password} = req.body

    let user = await User.findOne({email})

    

    if(!user) return res
      .status(400)
      .send({ message: "This email has not been already registered" });

        let isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).send({ message: "Password is incorrect" });

        const token =  JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

       return res.send({message: "Login success!", token})
    
})

route.get("/users", async (req, res) => {
    let users = await User.find()
    res.send(users)
})

export default route;


