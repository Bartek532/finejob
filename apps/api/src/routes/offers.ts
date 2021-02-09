import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getAllOffers,
  getOffersByQuery,
} from "../controllers/offersController";

const router = express.Router();

router.get("/", catchAsync(getAllOffers));
router.get("/search", catchAsync(getOffersByQuery));

export default router;
