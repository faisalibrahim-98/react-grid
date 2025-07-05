import fs from "fs";
import express from "express";
import cors from "cors";

const rawData = fs.readFileSync("./data.json", "utf-8");
const data = JSON.parse(rawData);

const app = express();
const port = 5001;

const { grid: gridData, iterations: iterationsData } = data[0];

app.use(cors());

app.get("/api/grid", (req, res) => {
  res.json({ grid: gridData });
});

app.get("/api/iterations", (req, res) => {
  res.json({ iterations: iterationsData });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
