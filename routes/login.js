var express = require('express');
var router = express.Router();
const {
  findByUsername,
  findByUsernameAndPassword,
} = require('../db/usersQueries');

async function login(req, res, next) {
  const { username, password } = req.body;
  const userByUsername = await findByUsername(username);
  const userByUsernameAndPw = await findByUsernameAndPassword({
    username,
    password,
  });
  if (userByUsernameAndPw) {
    res.status(200).json({
      login: true,
      data: userByUsernameAndPw,
      validation: [],
    });
  } else if (userByUsername) {
    res.status(200).json({
      login: false,
      data: userByUsername,
      validation: [{ error: 'Wrong password.' }],
    });
  } else {
    res.status(200).json({
      login: false,
      data: {},
      validation: [{ error: 'Username not found.' }],
    });
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', login);

module.exports = router;
