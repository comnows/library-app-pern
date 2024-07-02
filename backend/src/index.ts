import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

type portType = string | number;

const app: Express = express();
const port: portType = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
