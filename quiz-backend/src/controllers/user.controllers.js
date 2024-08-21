const jwt = require("jsonwebtoken");


const User = require("../models/user.models.js");
const asyncHandler = require("../utills/asynchandler.js");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
   
    if (!email || !password || !name) {
        console.error("Enter name, email and password");
        return res.status(400).send("Enter email and password");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        console.log("User already exists");
        return res.status(400).send("User already exists");
    }

    const user = await User.create({ name, email, password });
    console.log(user);
    return res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error("Enter email and password");
        return res.status(400).send("Enter email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(400).send("Invalid password");
    }

    const token = jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: "1d" });
    
    res.status(200).json({ success: 200, token , email, user: user._id});
    console.log("User login");
});


const logoutUser = asyncHandler(async (req, res) => {
  try {
  const data= JSON.stringify(req.body);
   console.log("req body"+data);
    if (!req.body.email) {
      return res.status(401).send('User not authenticated');
    }
  
    await User.findOneAndUpdate(
      { email: req.body.email },  
      { $unset: { token: undefined } },
      { new: true }
    );

    console.log("logout"+" "+req.body.token);

    res
      .status(200)
      .clearCookie('accessToken', { httpOnly: true, secure: true })
      .clearCookie('refreshToken', { httpOnly: true, secure: true })
      .json({ success: true, message: 'User logged out' });

  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).send('Something broke!');
  }
  console.log(token);
});



module.exports = { registerUser, loginUser, logoutUser };