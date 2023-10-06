import express from "express";
import { check } from "express-validator";
import userController from "../controllers/user_controller.js";

const router = express.Router();

router.post(
  "/signup",
  [
    check("name", "Please enter a valid username").trim().notEmpty(),
    check("email", "Please enter a valid email").trim().isEmail(),
    check("phone", "Please enter a valid phone").trim().isNumeric(),
    check("password", "Please enter a valid password")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.signUp
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").trim().isEmail(),
    check("password", "Please enter a valid password")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.login
);

export default router;
