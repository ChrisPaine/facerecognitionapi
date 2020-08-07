console.log('\nConnnected\n');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// 127.0.0.1 = localhost
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });



app.use(bodyParser.json());
app.use(cors());

// dependency injection
app.get('/', (req, res) => {res.send('it is working!')});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}); 
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});

/*Endpoints
/ --> res        --> GET  = this is working
/signin          --> POST = success/fail - https in body hidden
/register        --> POST = user obj
/profile/:userId --> GET  = user
/image           --> PUT  = user 0bj
*/

