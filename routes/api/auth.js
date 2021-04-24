const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Model
const User = require('../../models/User');

// @route    GET api/auth
// @desc     Auth user (Get user by token)
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

module.exports = router;
