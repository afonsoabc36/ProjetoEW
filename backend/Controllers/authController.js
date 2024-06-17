const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const { OAuth2Client } = require("google-auth-library");

const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    const token = jwt.sign({ email, role }, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(password))) {
      console.log(password, user.password);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ data: user.toJSON(), token });
  } catch (error) {
    console.error("Failed to verify email & password", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const client = new OAuth2Client(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET
);

const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ data: user.toJSON(), token });
  } catch (error) {
    console.error("Failed to verify Google token", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const githubLogin = async (req, res) => {
  try {
    const { code } = req.body;

    const tokenData = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        code,
      }),
    }).then(res => res.json());

    const { access_token } = tokenData;

    const githubEmails = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(res => res.json());

    const primaryEmailObj = githubEmails.find(email => email.primary);
    const primaryEmail = primaryEmailObj['email'];

    let user = await User.findOne({ email: primaryEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { primaryEmail, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    
    res.status(200).json({ data: user.toJSON(), token });
  } catch (error) {
    console.error("GitHub login failed", error);
    res.status(500).json({ message: "GitHub login failed" });
  }
};

module.exports = { register, login, googleLogin, githubLogin };
