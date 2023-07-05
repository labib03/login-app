import cors from "cors";
import express from "express";
import morgan from "morgan";
import ENV from "./config.js";
import connect from "./databases/connection.js";
import { router } from "./router/route.js";

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const PORT = 8080;
const MONGO_URL = ENV.MONGO_URL;

// HTTPS Request
app.get("/", (req, res) => {
  res.status(201).json({
    status: "SUCCESS",
    data: "Backend services run",
  });
});

// Route
app.use("/api", router);

// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     // listen app
//     app.listen(PORT, () => {
//       console.log(
//         `connect to databases & listening on http://localhost:${PORT}/`
//       );
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

connect()
  .then(() => {
    try {
      app.listen(PORT, () =>
        console.log(`The server running on: http://localhost:${PORT}`)
      );
    } catch (error) {
      console.log("Cannot connect to the server ...");
    }
  })
  .catch((err) => {
    console.log("err =>", err);
  });

// app.listen(port, () =>
//   console.log(`The server running on: http://localhost:${port}`)
// );
