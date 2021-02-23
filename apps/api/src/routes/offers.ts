import express from "express";
import { catchAsync } from "../middlewares/errors";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";
import {
  getOffersByQuery,
  getRecommendedOffers,
  getOffersByLocation,
  getSingleOffer,
  checkIsOfferSaved,
} from "../controllers/offersController";

const router = express.Router();

router.get("/search", catchAsync(getOffersByQuery));
router.get("/location", catchAsync(getOffersByLocation));
router.get("/recommended", catchAsync(getRecommendedOffers));
router.get("/:id", catchAsync(getSingleOffer));
router.get(
  "/saved-offer/:id",
  validateToken,
  validateUser,
  catchAsync(checkIsOfferSaved)
);

export default router;
