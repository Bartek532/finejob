import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getOffers,
  getRecommendedOffers,
  getSingleOffer,
  createOffer,
  deleteOffer,
} from "../controllers/offersController";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";

import { validateFilters } from "../middlewares/validateFilters";

const router = express.Router();

router.get("/search", validateFilters, catchAsync(getOffers));
router.get("/recommended", catchAsync(getRecommendedOffers));
router.get("/:id", catchAsync(getSingleOffer));
router.post("/", validateToken, validateUser, catchAsync(createOffer));
router.delete("/:id", validateToken, validateUser, catchAsync(deleteOffer));

export default router;
