const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function matchToken(req, res, next) {
  const { headers } = req;
  const token = headers['authorization-token'];

  if (!token) {
    return res.status(401).json({ 
      auth: false, message: 'No token provided' 
    });
  }

  try {
    jwt.verify(token, jwtSecret);

    // console.log(id);
  
    // req.userId = id;
  }
  catch (error) {
    return res.status(401).json({ 
      auth: false, message: 'Invalid token' 
    });
  }


  next();
}

module.exports = matchToken