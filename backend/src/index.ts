import express, { Express } from "express";
import dotenv from "dotenv";
import booksRouter from "./routes/books";

dotenv.config();

type portType = string | number;

const app: Express = express();
const port: portType = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
