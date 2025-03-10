import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  json({
    limit: "16kb",
  })
);
app.use(
  urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(cookieparser());
app.use(express.static("public"));

console.log(process.env.CORS_ORIGIN);

app.get("/api/data", (req, res) => {
  res.json({
    message: "This is Shahvez! Responding from backend",
    success: true,
  });
});

export default app;
