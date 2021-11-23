const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
// const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	},
});

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
// app.use(cors());
app.use(function (req, res, next) {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://facefindr.herokuapp.com'
	);

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/', (req, res) => {
	res.send('Get off my lawn! 👴🏻');
});
app.post('/signin', (req, res) => {
	signin.handleSignIn(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(port, () => {
	console.log(`🚀 Server is live on ${port}`);
});
