import express from "express";
import { catchAsync } from "../middlewares/errors";
import { login, register } from "../controllers/usersController";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.get("/islogin", validateToken);

export default router;
