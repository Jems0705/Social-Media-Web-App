import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorhandler from "errorhandler";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorhandler());
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});
app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
