import jwt from "jsonwebtoken"

let auth = (req, res, next) => {
    let header = req.headers.authorization;
    console.log(req.headers.authorization);
    if(!header){
        return res.send("No token provided")
    }
    try{
        let token = header.split(" ")[1]
    let decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    console.log(decode);
    next()
    }catch(err){
        console.log(err.message);
    }
}

export default auth;

