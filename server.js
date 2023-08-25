const express = require("express");

const colors = require("colors");

const cors = require("cors");

const morgan = require("morgan");

const dotenv = require("dotenv");

const connectDb = require("./config/db")

// routes import 
const userRoutes = require("./routes/userRoutes")

const blogRoutes = require("./routes/blogroutes")


// env connfigaratin 
dotenv.config();

// monogodb connection 
connectDb()


// reser Objects

const app = express();

// middileware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use('/api/v1/user',userRoutes)

// blog routes 
app.use("/api/v2/blog",blogRoutes)



// listen

// port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is ${process.env.DEV_MODE} Runing on ${PORT}`.bgCyan.white
  );
});
