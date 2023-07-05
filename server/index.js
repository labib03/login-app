import cors from "cors";
import express from "express";
import morgan from "morgan";
import { router } from "./router/route.js";

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const port = 8080;

// HTTPS Request
app.get("/", (req, res) => {
  res.status(201).json({
    status: "SUCCESS",
    data: "Backend services run",
  });
});

// Route
app.use("/api", router);

// connect()
//   .then(() => {
//     try {
//       app.listen(port, () =>
//         console.log(`The server running on: http://localhost:${port}`)
//       );
//     } catch (error) {
//       console.log("Cannot connect to the server ...");
//     }
//   })
//   .catch((err) => {
//     console.log("err =>", err);
//   });

app.listen(port, () =>
  console.log(`The server running on: http://localhost:${port}`)
);
