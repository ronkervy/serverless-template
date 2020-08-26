const createHttpError = require('http-errors');
const UserModel = require('../models/user.model');
const {
    generateToken,
    genereateRefToken
} = require('../config/utils.config');
const bcryptjs = require('bcryptjs');

const AuthControllers = {
    login : async (req,res,next)=>{
        try{
            const {uname,pword} = req.body;

            if( !uname || !pword ) return next(createHttpError.Unauthorized());

            const user = await UserModel.findOne({uname : uname});
            if( user == null) return next(createHttpError.Unauthorized("Invalid User"));            

            bcryptjs.compare(pword,user.pword, async (err,isMatch)=>{
                if( err ) return next(createHttpError.Unauthorized());
                if( !isMatch ) return next(createHttpError.Unauthorized());

                try{
                    const accesstoken = await generateToken(user);
                    const refreshtoken = await genereateRefToken(user);

                    if( !accesstoken || !refreshtoken ) return next(createHttpError.Unauthorized());
    
                    const __authtokens = {
                        __at  : accesstoken,
                        __rt : [refreshtoken]
                    }
                    
                    res.status(201)
                        .cookie('__authtokens',JSON.stringify(__authtokens),{
                            expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
                            httpOnly : true,
                            secure : false
                        }).json({
                            success : true,
                            info : {
                                uname : user.uname,
                                email : user.email
                            }
                        });                    
                }catch(err){
                    next(err);
                }
            });
        }catch(err){
            next(err);
        }        
    },
    register : async (req,res,next)=>{
        try{
            const {uname,email,pword} = req.body;

            if( !uname || !pword ) return next(createHttpError.Unauthorized());

            const userExists = await UserModel.findOne({uname : uname});
            if(userExists) return next(createHttpError.Conflict());
    
            const createdUser = await UserModel.create(req.body);
            if( createdUser == null ) return next(createHttpError.BadRequest());
            
            const accesstoken = await generateToken(createdUser);
            const refreshtoken = await genereateRefToken(createdUser);

            if( !accesstoken || !refreshtoken ) return next(createHttpError.Unauthorized());

            const __authtokens = {
                __at  : accesstoken,
                __rt : [refreshtoken]
            }
            
            res.status(201)
                .cookie('__authtokens',JSON.stringify(__authtokens),{
                    expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
                    httpOnly : true,
                    secure : false
                }).json({
                    success : true,
                    info : {
                        uname : createdUser.uname,
                        email : createdUser.email
                    }
                });             

        }catch(err){
            next(err);
        }
    },
    dashboard : (req,res,next)=>{
        if( !req.user ) return next(createHttpError.Unauthorized());
        res.status(200).json(req.user);
    },
    refreshToken : (req,res,next)=>{

    },
    logout : (req,res,next)=>{

    }
}

module.exports = AuthControllers;