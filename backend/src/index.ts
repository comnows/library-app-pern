import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "./routes/books";
import booksClassesRouter from "./routes/books-classes";
import membersRouter from "./routes/members";
import lendRouter from "./routes/lend-list";

dotenv.config();

type portType = string | number;

const app: Express = express();
const port: portType = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/classes", booksClassesRouter);
app.use("/api/v1/members", membersRouter);
app.use("/api/v1/lend-lists", lendRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
