const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

const app = express();
const AuthRoutes = require('../routes/auth.routes');

app.use(bp.json());
app.use(helmet());
app.use(cors());

app.use(process.env.API_ROUTE,AuthRoutes);

module.exports.handler = serverless(app);