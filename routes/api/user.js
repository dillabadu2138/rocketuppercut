const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Import Models
const User = require('../../models/User');

// @route     POST api/user/register
// @desc      Register user
// @access    Public
router.post('/register', async (req, res) => {
  // Destructure the request
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      // Early Return
      return res
        .status(400)
        .json({ errors: [{ msg: '이미 해당 이메일의 사용자가 있습니다.' }] });
    }

    // Get a user gravatar from an email address
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    // Create a new user instance
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // Replace the plain password with the hashed one before saving to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user document to the database
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('secretKey'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route     POST api/user/login
// @desc      Login user
// @access    Public
router.post('/login', async (req, res) => {
  // Destructure the request
  const { email, password } = req.body;

  try {
    // Check the email address
    let user = await User.findOne({ email: email });
    if (!user) {
      // Early Return
      return res
        .status(400)
        .json({ errors: [{ msg: '이메일 또는 비밀번호가 틀렸습니다.' }] });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Early Return
      return res
        .status(400)
        .json({ errors: [{ msg: '이메일 또는 비밀번호가 틀렸습니다.' }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('secretKey'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

module.exports = router;
