import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser"
import cors from 'cors';
import mongoose from 'mongoose';

const dbName = 'heleverse_db';

mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express()
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", routes);

app.listen(3001, () => {
  console.log(`Heleverse project running on PORT No- ${3001}`);
});
