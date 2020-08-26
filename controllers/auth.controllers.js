

const AuthControllers = {
    login : (req,res,next)=>{
        res.send({
            message : "Login Page"
        }).status(200);
    },
    register : (req,res,next)=>{

    },
    authenticate : (req,res,next)=>{

    },
    refreshToken : (req,res,next)=>{

    },
    logout : (req,res,next)=>{

    }
}

module.exports = AuthControllers;