const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpires } = require('../../config');
const { 
  loginSchemaValidator,
  registerSchemaValidator
} = require('../../controllers/users/user.validators');

const User = require('../../models/User');

const TIME_TO_EXPIRE = 24 * 60 * 60 * 1000;

//registro
const register = async (req, res) => {

  const { value, error } = registerSchemaValidator(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  const { email, password } = value;

  console.log(email, password);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }


  const user = new User({
    email,
    password,
  })

  user.password = await user.encryptPassword(password);

  try {
    await user.save();

    const token = jwt.sign(
      { id: user._id }, 
      jwtSecret, 
      { expiresIn: jwtExpires }
    )

    res.cookie('token', token, { 
      sameSite: 'none',
      secure: true,
      httpOnly: false, 
      maxAge: TIME_TO_EXPIRE 
    });

    res.json({ message: 'User saved', token: token });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }

}

//login
const signin = async (req, res) => {

  const { value, error } = loginSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = value;

  const user = await User.findOne( { email } );
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const match = await user.matchPassword(password);

  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials', token: null });
  }

  const token = jwt.sign(
    { id: user._id }, jwtSecret, { expiresIn: jwtExpires }
  );

  res.cookie('token', token, {
    sameSite: 'none',
    secure: true,
    httpOnly: false, 
    maxAge: TIME_TO_EXPIRE 
  });
  
  res.status(200).json({ message: 'User authenticated', token: token, auth: true, role: user.role });
}

//profile
const profile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
}

const logOut = async (req, res) => {

  res.clearCookie('token');

}

const verifyToken = async (req, res) => {
  console.log("LLEGUE AL VERIFY TOKEN");
  console.log(req.cookies);
  const { token }  = req.cookies;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json({ auth: true, user });
  }
  catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  register,
  signin,
  profile,
  logOut,
  verifyToken
}