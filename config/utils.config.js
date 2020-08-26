const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
require('dotenv').config();

const IssueToken = {
    generateToken : (user)=>{
        return new Promise((resolve,reject)=>{            
            const payload = {
                sub : user._id,
                uname : user.uname,            
            }
            
            jwt.sign(payload,process.env.ACCESS_KEY,{
                expiresIn : '7 days'
            },(err,token)=>{
                if(err) return reject(err);
                return resolve(token);
            });
        });
    },
    genereateRefToken : (user)=>{
        return new Promise((resolve,reject)=>{
            const payload = {
                sub : user._id,
                uname : user.uname,            
            }
            
            jwt.sign(payload,process.env.REFRESH_KEY,(err,token)=>{
                if(err) return reject(err);
                return resolve(token);
            });            
        });
    },
    authenticateToken : (req,res,next)=>{
        const tokens = req.cookies.__tokens ? req.cookies.__tokens : null;
        if( tokens !== null ){
            jwt.verify(tokens.__at,process.env.ACCESS_KEY,(err,user)=>{
                if(err) return next(createHttpError.Unauthorized());
                req.user = user;
                next();
            });
        }
        next();
    }
}

module.exports = IssueToken;