import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { notFound, catchErrors } from "./middlewares/errors";
import users from "./routes/users";
import offers from "./routes/offers";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", users);
app.use("/api/offers", offers);

app.use(notFound);
app.use(catchErrors);

const port = process.env.PORT || 3080;

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server is up on port ${port}`);
});
