const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const serverless = require('serverless-http');

const app = express();


module.exports.handler = serverless(app);