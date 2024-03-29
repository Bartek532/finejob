import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  getUserInfo,
  login,
  register,
  logoutUser,
  changeUserInfo,
  saveOffer,
  unsaveOffer,
  getUserOffer,
  getUserOffers,
} from "../controllers/usersController";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.get("/", validateToken, validateUser, catchAsync(getUserInfo));
router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.get("/isLogin", validateToken);
router.get("/logout", validateToken, validateUser, catchAsync(logoutUser));
router.post("/", validateToken, validateUser, catchAsync(changeUserInfo));

router.post("/offers", validateToken, validateUser, catchAsync(saveOffer));

router.delete(
  "/offers/:id",
  validateToken,
  validateUser,
  catchAsync(unsaveOffer),
);

router.get(
  "/offers/:id",
  validateToken,
  validateUser,
  catchAsync(getUserOffer),
);

router.get("/offers", validateToken, validateUser, catchAsync(getUserOffers));

export default router;
