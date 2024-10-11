const usernameValidationRegex = /^[0-9A-Za-z._\-]{3,40}$/;
const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const genderValidValues = ['male', 'female', 'not-set'];

const signupValidator = (request, _response, next) => {
  // sanitization
  const {
    firstname = null,
    lastname = null,
    username = null,
    password = null,
    gender = 'not-set'
  } = request.body;

  // firstname
  if (typeof firstname !== 'string') {
    return next(
      new Error('use type string for firstname', { cause: { statusCode: 400 } })
    );
  }
  if (!firstname.trim()) {
    return next(
      new Error('firstname is required', { cause: { statusCode: 400 } })
    );
  }
  if (firstname.length < 3 || firstname.length > 40) {
    return next(
      new Error('3 <= firstname length <= 40', { cause: { statusCode: 400 } })
    );
  }

  // lastname
  if (typeof lastname !== 'string') {
    return next(
      new Error('use type string for lastname', { cause: { statusCode: 400 } })
    );
  }
  if (!lastname.trim()) {
    return next(
      new Error('lastname is required', { cause: { statusCode: 400 } })
    );
  }
  if (lastname.length < 3 || lastname.length > 40) {
    return next(
      new Error('3 <= lastname length <= 40', { cause: { statusCode: 400 } })
    );
  }

  // username
  if (typeof username !== 'string') {
    return next(
      new Error('use type string for username', { cause: { statusCode: 400 } })
    );
  }
  if (!username.trim()) {
    return next(
      new Error('username is required', { cause: { statusCode: 400 } })
    );
  }
  if (typeof username !== 'string') {
    return next(
      new Error('use type string for username', { cause: { statusCode: 400 } })
    );
  }
  if (username.length < 3 || username.length > 40) {
    return next(
      new Error('3 <= firstname length <= 40', { cause: { statusCode: 400 } })
    );
  }
  // check letters, numbers & (. - _) for username
  if (!usernameValidationRegex.test(username)) {
    return next(
      new Error('use letters, numbers and (. - _)', {
        cause: { statusCode: 400 }
      })
    );
  }

  // password
  if (typeof password !== 'string') {
    return next(
      new Error('use type string for password', { cause: { statusCode: 400 } })
    );
  }
  if (!password.trim()) {
    return next(
      new Error('password is required', { cause: { statusCode: 400 } })
    );
  }

  if (!passwordValidationRegex.test(password)) {
    return next(
      new Error('minimum 8 characters, at least one letter and one number', {
        cause: { statusCode: 400 }
      })
    );
  }
  // gender
  if (typeof gender !== 'string') {
    return next(
      new Error('use type string for password', { cause: { statusCode: 400 } })
    );
  }
  if (!genderValidValues.includes(gender)) {
    return next(
      new Error('use male | female for gender', { cause: { statusCode: 400 } })
    );
  }

  next();
};

module.exports = { signupValidator };
