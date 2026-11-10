import express, { Request, Response } from "express";
import { PORT } from "./config/env";
import productRoutes from "./products";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Home Lab server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
