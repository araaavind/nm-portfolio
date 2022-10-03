const Mongoose = require('mongoose');

const cloudDb = `mongodb+srv://nm-portfolio.cwlojg9.mongodb.net`;
const connectDb = async () => {
  await Mongoose.connect(cloudDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Mongodb connected successfully.');
}

module.exports = connectDb;