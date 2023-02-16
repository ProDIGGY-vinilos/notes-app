import express from "express";
import config from "./config";
import cors from "cors";
import notesRoutes from "./routes/notes";

const app = express();
app.use(cors());
app.set("port", config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/notes", notesRoutes);

export default app;
