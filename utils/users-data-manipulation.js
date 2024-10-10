const { join } = require('node:path');
const {
  access,
  writeFile,
  constants: { F_OK }
} = require('node:fs/promises');

const resourcePath = join(__dirname, '../users-data.json');

const writeUsersData = async (users) => {
  try {
    await access(resourcePath, F_OK);

    const usersAsJson = JSON.stringify(users);
    await writeFile(resourcePath, usersAsJson);
  } catch (err) {
    throw err;
  }
};

module.exports = { writeUsersData };
