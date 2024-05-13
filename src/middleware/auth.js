const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const User = require('../models/User');

function matchToken(req, res, next) {
  const { headers } = req;
  const token = headers['authorization-token'];
  let id;

  if (!token) {
    return res.status(401).json({ 
      auth: false, message: 'No token provided' 
    });
  }

  try {
    id = jwt.verify(token, jwtSecret);
  }
  catch (error) {
    return res.status(401).json({ 
      auth: false, message: 'Invalid token' 
    });
  }

  const user = User.findById(id);

  req.user = {
    _id: id,
    role: user.role
  };
  next();
}

module.exports = matchToken