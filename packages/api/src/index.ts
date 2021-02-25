import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import bodyParser from "body-parser";
import { notFound, catchErrors } from "./middlewares/errors";
import users from "./routes/users";
import offers from "./routes/offers";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/offers", offers);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}
app.use(notFound);
app.use(catchErrors);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log("Server is up");
});
