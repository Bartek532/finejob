import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getOffersByQuery,
  getRecommendedOffers,
  getOffersByLocation,
  getSingleOffer,
} from "../controllers/offersController";

const router = express.Router();

router.get("/search", catchAsync(getOffersByQuery));
router.get("/location", catchAsync(getOffersByLocation));
router.get("/recommended", catchAsync(getRecommendedOffers));
router.get("/:id", catchAsync(getSingleOffer));

export default router;
