const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  // xu li loi vi du nhu console.log(x) -> chua khai bao x
  console.log('uncaught Exception! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Start sever
const server = app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
