const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use public files
app.use(express.static("public"));

// Connect to Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Backend routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});