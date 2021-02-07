import express from "express";
import { catchAsync } from "../middlewares/errors";
import { getAllOffers } from "../controllers/offersController";

const router = express.Router();

router.get("/", catchAsync(getAllOffers));

export default router;
