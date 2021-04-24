const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if a token exists
  if (!token) {
    return res.status(401).json({ msg: '토큰이 존재하지 않습니다.' });
  }

  // Verify token if there is one
  jwt.verify(token, config.get('secretKey'), (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: '유효한 토큰이 아닙니다.' });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};
