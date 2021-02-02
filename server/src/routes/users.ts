import express from "express";
import { catchAsync } from "../middlewares/errors";
import { login, register } from "../controllers/usersController";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));

export default router;
