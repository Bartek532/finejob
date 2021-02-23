import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  login,
  register,
  saveOffer,
  unsaveOffer,
  getSavedOffer,
} from "../controllers/usersController";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.get("/islogin", validateToken);
router.post("/offers", validateToken, validateUser, catchAsync(saveOffer));
router.delete(
  "/offers/:id",
  validateToken,
  validateUser,
  catchAsync(unsaveOffer)
);
router.get(
  "/offers/:id",
  validateToken,
  validateUser,
  catchAsync(getSavedOffer)
);

export default router;
