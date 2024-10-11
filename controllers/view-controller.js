const { join } = require('node:path');

const renderLoginPage = (_request, response, _next) => {
  response.status(200).sendFile(join(__dirname, '../views/login.html'));
};

module.exports = { renderLoginPage };
