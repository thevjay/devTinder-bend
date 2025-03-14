// Handle Auth Middleware for only Get requests GET, POST....requests
const adminAuth = ("/admin",(req,res,next)=>{

    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === 'xyz';
    if(isAdminAuthorized){

        next();
    }else{
        res.status(500).send("Unathurized Request")
    }
})


module.exports = {adminAuth};