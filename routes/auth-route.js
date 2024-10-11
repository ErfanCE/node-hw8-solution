const router = require('express').Router();
const { signup, login } = require('../controllers/auth-controller');
const { signupValidator } = require('../controllers/validation-controller');

router.post('/signup', signupValidator, signup);
router.post('/login', login);

module.exports = router;
