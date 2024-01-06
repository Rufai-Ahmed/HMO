import { Router } from "express";
import {
  createUser,
  signInUser,
  updateUserAvatar,
  updateUserLocation,
  updateUserNames,
  updateUserPhoneNumber,
  verifyUser,
} from "../controller/userController";
import { upload } from "../utils/multer";

const router: Router = Router();

router.route("/register-user").post(createUser);
router.route("/verify-user/:userID").patch(verifyUser);
router.route("/sign-in-user").post(signInUser);
router.route("/update-user-name/:userID").patch(updateUserNames);
router.route("/update-user-location/:userID").patch(updateUserLocation);
router.route("/update-user-phone/:userID").patch(updateUserPhoneNumber);
router.route("/update-avatar/:userID").patch(upload, updateUserAvatar);

export default router;
