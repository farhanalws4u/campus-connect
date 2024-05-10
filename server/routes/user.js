import express from "express";

import {
  addUserData,
  getUserData,
  addDeviceToken,
} from "../controllers/user.js";

const router = express.Router();

router.post("/addUserData", addUserData);
router.post("/getUserData", getUserData);
router.post("/addDeviceToken", addDeviceToken);

export default router;
