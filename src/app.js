const express = require('express');
const dotenv = require('dotenv');
const routes =  require('./routes/routes');
const auth =  require('./middleware/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();
app.use(cookieParser());


app.use(cors( {
  credentials: true,
  origin: ['http://localhost:4200', 'https://localhost:3000']
} ));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prefix = '/apiv1';

app.use( `${prefix}/users`, routes.userRoutes );
app.use( `${prefix}/participants`, auth, routes.participans );

module.exports = app;