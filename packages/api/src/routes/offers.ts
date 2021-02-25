import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getOffers,
  getRecommendedOffers,
  getSingleOffer,
} from "../controllers/offersController";

import { validateFilters } from "../middlewares/validateFilters";

const router = express.Router();

router.get("/search", validateFilters, catchAsync(getOffers));
router.get("/recommended", catchAsync(getRecommendedOffers));
router.get("/:id", catchAsync(getSingleOffer));

export default router;
