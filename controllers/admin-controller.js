const { writeUsersData } = require('../utils/users-data-manipulation');
const users = require('../users-data.json');

const getAllUsers = (request, response, next) => {
  const usersWithoutPassword = users.map((user) => {
    const { firstname, lastname, gender, username } = user;
    return { firstname, lastname, gender, username };
  });

  response.status(200).json({
    status: 'success',
    data: {
      total: users.length,
      users: usersWithoutPassword
    }
  });
};

const getUserByUsername = (request, response, next) => {
  const { username = null } = request.query;

  if (!username?.trim()) {
    return next(
      new Error('username is required', { cause: { statusCode: 400 } })
    );
  }

  const user = users.find((user) => user.username === username);
  if (!user) {
    return next(
      new Error(`username(${username}) not found`, {
        cause: { statusCode: 404 }
      })
    );
  }

  response.status(200).json({
    status: 'success',
    data: {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        username: user.username
      }
    }
  });
};

const removeUserByUsername = async (request, response, next) => {
  try {
    const { method, originalUrl } = request;
    const { username = null } = request.params;

    console.log(username);

    // /admin/delete-user/
    if (!username?.trim()) {
      return next(
        new Error(`${method} ${originalUrl} not Found.`, {
          cause: { statusCode: 404 }
        })
      );
    }

    const targetUserIndex = users.findIndex(
      (user) => user.username === username
    );

    // /admin/delete-user/behnam
    if (targetUserIndex === -1) {
      return next(
        new Error(`${method} ${originalUrl} not Found.`, {
          cause: { statusCode: 404 }
        })
      );
    }

    users.splice(targetUserIndex, 1);
    await writeUsersData(users);

    response.status(204).json({
      status: 'success',
      data: null
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

module.exports = { getAllUsers, getUserByUsername, removeUserByUsername };
