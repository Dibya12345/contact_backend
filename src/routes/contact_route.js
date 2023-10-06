import express from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth.js";
import {
  createContact,
  findAllContact,
  findOneContact,
  deleteContact,
  updateContact,
} from "../controllers/contact_contoller.js";

const router = express.Router();

router.get("/", findAllContact);

router.post(
  "/new",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("email", "Please fill out the field").trim().notEmpty(),
    check("phone", "Please enter a valid phone").trim().isNumeric(),
  ],
  createContact
);

router.get("/:id", findOneContact);

router.post(
  "/edit/:id",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("email", "Please fill out the field").trim().notEmpty(),
    check("phone", "Please enter a valid phone").trim().isNumeric(),
  ],

  updateContact
);

router.post("/delete/:id", auth, deleteContact);

export default router;
