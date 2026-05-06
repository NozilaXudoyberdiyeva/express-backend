function checkAdmin(req, res, next){
    if(req.user.role !== "ADMIN"){
        return res.status(400).send("Bu amaliyotni faqat admin bajara oladi")
    }

    next()
}

export default checkAdmin;