import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  getProjects,
  searchProfile,
  getProjectsBySkill,
  getTopSkills,
  deleteProfile
} from "../controllers/profile.controller.js";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";


const router = express.Router();

router.get("/profile", getProfile);
router.post(
  "/profile",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("skills").isArray(),
  ],
  validateRequest,
  createProfile
);
router.put("/profile", updateProfile);
router.get("/search", searchProfile);
router.get("/projects", (req, res, next) => {
  if (req.query.skill) {
    return getProjectsBySkill(req, res, next);
  }
  return getProjects(req, res, next);
});

router.get("/skills/top", getTopSkills);
router.delete("/profile", deleteProfile);


export default router;
