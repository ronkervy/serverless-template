const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');
require('dotenv').config();


const app = express();
const AuthRoutes = require('../routes/auth.routes');
const whitelist = process.env.LIST.split(',');

const corsOpt = {
    origin : (origin,cb)=>{
        console.log(whitelist);
        if( whitelist.indexOf(origin) !== -1 || !origin ) return cb(null,true);
        return cb(new Error("Not Allowed by CORS."));
    },
    credentials : true,
    methods : ['OPTIONS','GET','PUT','POST'],
    optionsSuccessStatus : 204
}

app.use(bp.json());
// app.use(helmet());
app.use(cors(corsOpt));
app.use(cookieParser());

app.use(process.env.API_ROUTE,AuthRoutes);

module.exports.handler = serverless(app);