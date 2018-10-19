const axios = require('axios');
// const { authenticate } = require('./middlewares');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwt = require('jsonwebtoken');

const jwtSecret = 'nobody$tosses)a!dwarf!';
function generateToken(user) {
    const jwtPayload = {
	...user,
	hello: 'FSW13',
	role: 'admin'
    };
    const jwtOptions = {
	expiresIn: '5m'
    };    
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
    // implement user registration
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;

    db('users')
	.insert(credentials)
	.then(ids => {
	    const id = ids[0];
	    res.status(201).json({ newUserId: id });
	})
	.catch(err => {
	    res.status(500).json(err);
	});
}

function login(req, res) {
    // implement user login
    const creds = req.body;
    db('users')
	.where({ username: creds.username })
	.first()
	.then(user => {
	    if (user && bcrypt.compareSync(creds.password, user.password)) {
		const token = generateToken(user);
		res.status(200).json({ welcome: user.username, token});
	    } else {
		res.status(401).json({ message: 'you shall not pass!' });
	    }
	})
	.catch(err => {
	    res.status(500).json({ err });
	});
}

function getJokes(req, res) {
    axios
	.get(
	    'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
	)
	.then(response => {
	    res.status(200).json(response.data);
	})
	.catch(err => {
	    res.status(500).json({ message: 'Error Fetching Jokes', error: err });
	});
}

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
	jwt.verify(token, jwtSecret, (err, decodedToken) => {
	    if(err) {
		res.status(401).json({mesage: `token verification failed`});
	    } else {
		req.decodedToken = decodedToken;
		next();
	    }
	});
    } else {
	res.status(401).json({mesage: `no token provided`});
    }
}
