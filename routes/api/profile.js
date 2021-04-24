const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get the current user's profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    // If there is no profile
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for the current user' });
    }

    // If there is a profile
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    POST api/profile
// @desc     Create or update the current user's profile
// @access   Private
router.post('/', auth, async (req, res) => {
  // Destructure the request
  const { status, fields, introduction } = req.body;

  // Build a profile
  const profileFields = {
    user: req.user.id,
    status: status && status,
    fields: fields && fields,
    introduction: introduction && introduction,
  };

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    GET api/profile/recent
// @desc     Get recent profiles
// @access   Public
router.get('/recent', async (req, res) => {
  try {
    const profiles = await Profile.find()
      .sort({ date: -1 })
      .limit(5)
      .populate('user', ['name', 'avatar']);

    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    GET api/profile
// @desc     Get profiles by keyword
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ name: req.query.keyword });
    if (users.length === 0) {
      return res
        .status(400)
        .json({ msg: '검색한 사용자는 존재하지 않습니다.' });
    }

    const ids = users.map((user) => user._id);
    const profiles = await Profile.find({
      user: ids,
    }).populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'email']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user's posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: '계정이 삭제되었습니다.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    profile.experiences.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    profile.experiences = profile.experiences.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: '서버 에러' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    profile.educations.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 에러');
  }
});

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    profile.educations = profile.educations.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: '서버 에러' });
  }
});

module.exports = router;
