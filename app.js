const { join } = require('node:path');
const express = require('express');
const apiRouter = require('./routes/api-route');
const viewRouter = require('./routes/view-route');

const app = express();
const port = 8000;
const host = '127.0.0.1';

// Request Body Parser
app.use(express.json());

// serve static
app.use(express.static(join(__dirname, './public')));

// API Routes
app.use('/api', apiRouter);

// View Routes
app.use('/', viewRouter);

// Unhandled Request(404)
app.all('*', (request, response, next) => {
  const { method, originalUrl } = request;

  next(
    new Error(`${method} ${originalUrl} not Found.`, {
      cause: { statusCode: 404 }
    })
  );
});

// Global Error Handler
app.use((error, request, response, next) => {
  const errorMessage = error?.message ?? 'internal server error';
  const statusCode = error?.cause?.statusCode ?? 500;

  if (statusCode.toString().startsWith('4')) {
    return response.status(statusCode).json({
      status: 'fail',
      data: { message: errorMessage }
    });
  }

  response.status(statusCode).json({
    status: 'error',
    error: { message: errorMessage }
  });
});

app.listen(port, host, () => {
  console.info(`[i] Listening on ${port}:${host}...`);
});
