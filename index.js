import express from "express";
import Router from "./Routers/index.js";
import reply from "./Common/reply.js";
import dotenv from "dotenv";
dotenv.config();
// import 'dotenv/config'
import cors from "./Common/cors.js";
const app = express();

app.use(express.json());
app.use(cors);

const PORT = 5000;
app.use(Router);


app.get("/", (req, res) => {
  return res.json(reply.success("working"));
});

app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
