import express, {Application, json} from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth";

// Application
const app: Application = express();

// Settings
app.set("PORT", 3000)

// Middlewares
app.use(json())
app.use(morgan('dev'))

// Routes
app.use("/auth", authRoutes)

export default app;