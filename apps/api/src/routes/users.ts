import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  login,
  register,
  saveOffer,
  unsaveOffer,
} from "../controllers/usersController";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.get("/islogin", validateToken);
router.post("/save-offer", validateToken, validateUser, catchAsync(saveOffer));
router.post(
  "/unsave-offer",
  validateToken,
  validateUser,
  catchAsync(unsaveOffer)
);

export default router;
