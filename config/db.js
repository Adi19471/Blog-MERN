const mongose = require("mongoose");

const colors = require("colors");

const connectDb = async () => {
  try {
    await mongose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Backend Mongodb ${mongose.connection.host}`.bgRed.grey
    );
  } catch (error) {
    console.log(`MONGODB Connect Erorr , ${error}`.bgYellow.white);
  }
};

module.exports = connectDb;
