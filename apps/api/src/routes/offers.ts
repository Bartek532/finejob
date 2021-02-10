import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getOffersByQuery,
  getRecommendedOffers,
} from "../controllers/offersController";

const router = express.Router();

router.get("/search", catchAsync(getOffersByQuery));
router.get("/recommended", catchAsync(getRecommendedOffers));

export default router;
