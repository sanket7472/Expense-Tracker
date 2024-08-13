import User from '../models/User.js';

const SignUp = async (req, res) => {
  try {
    const { FullName, email, password, DOB } = req.body; // get values from request body
    const user = new User({
      FullName,
      email,
      password,
      DOB: new Date(DOB)
    });

    const SavedUser = await user.save();
    res.json({
      status: 'ok',
      message: 'User created successfully',
      user: SavedUser
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user',
      error: error.message
    });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({
      status: 'ok',
      message: 'User signed in successfully',
      user: user
    })
  }
  else {
    res.json({
      status: 'error',
      message: 'User not found',
    });
  }
}
export { SignUp, SignIn }