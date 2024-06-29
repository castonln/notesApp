import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();

// Logging package
app.use(morgan("dev"));

// Express will now accept JSON bodies (can POST)
app.use(express.json());

// Middleware catches all requests to endpoint, then goes to notesRoutes
app.use("/api/notes", notesRoutes);

// Middleware for requests to routes unused
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
})

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage }); // HTTP 500 internal server error
});

export default app;