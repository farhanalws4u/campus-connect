import express from "express";

import { addUserData, getUserData } from "../controllers/user.js";

const router = express.Router();

router.post("/addUserData", addUserData);
router.post("/getUserData", getUserData);

export default router;
