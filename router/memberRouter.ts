import { Router } from "express";
import {
  createMember,
  loginMembers,
  updateMemberAvatar,
  updateMemberLocation,
  updateMemberNames,
  updateMemberPhoneNumber,
  viewMembers,
} from "../controller/memberController";
import { upload } from "../utils/multer";

const router: Router = Router();

router.route("/create-member/:userID").post(createMember);
router.route("/view-members/:userID").get(viewMembers);
router.route("/login-member/:memberID").post(loginMembers);
router.route("/update-member-names/:memberID").patch(updateMemberNames);
router.route("/update-member-location/:memberID").patch(updateMemberLocation);
router.route("/update-member-number/:memberID").patch(updateMemberPhoneNumber);
router
  .route("/update-member-avatar/:memberID")
  .patch(upload, updateMemberAvatar);

export default router;
