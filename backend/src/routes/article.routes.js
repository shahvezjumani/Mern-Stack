import { createPost } from "../controllers/article.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.use(verifyJWT);

router.route("/createPost").post(upload.single("featuredImage"), createPost);

export default router;
