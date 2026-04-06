const mongoose = require('mongoose');

const connect = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_mongoose';
  await mongoose.connect(mongoUri);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connect, disconnect };
