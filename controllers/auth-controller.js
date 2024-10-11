const users = require('../users-data.json');
const { writeUsersData } = require('../utils/users-data-manipulation');

const signup = async (request, response, next) => {
  try {
    const {
      firstname,
      lastname,
      username,
      password,
      gender = 'not-set'
    } = request.body;

    // check duplication for username
    const isUsernameExists = !!users.find((user) => user.username === username);
    if (isUsernameExists) {
      return next(
        new Error('username already exists', {
          cause: { statusCode: 400 }
        })
      );
    }

    users.push({ firstname, lastname, username, password, gender });

    await writeUsersData(users);

    response.status(201).json({
      status: 'success',
      data: { user: { firstname, lastname, username, gender } }
    });
  } catch (err) {
    next(
      new Error(err?.message, {
        cause: {
          statusCode: 500
        }
      })
    );
  }
};

const login = (request, response, next) => {
  const { username, password } = request.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return next(
      new Error('USERNAME or password not match', {
        cause: { statusCode: 401 }
      })
    );
  }

  if (user.password !== password) {
    return next(
      new Error('username or PASSWORD not match', {
        cause: { statusCode: 401 }
      })
    );
  }

  response.status(200).json({
    status: 'success',
    data: {
      user: {
        firstname: user.firsname,
        lastname: user.lastname,
        username: user.username,
        gender: user.gender
      }
    }
  });
};

module.exports = { signup, login };
