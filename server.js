const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const corsOptions = {
  origin: "https://vocabularyfe.onrender.com" // frontend URI (ReactJS)
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    // Move the require statement here
    const termRoutes = require("./routes/termRoutes");
    app.use("/api/terms", termRoutes);
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));
