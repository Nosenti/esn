import express from "express";
import AuthController from "../controllers/JoinCommunityController.js";
import shareStatusController from "../controllers/shareStatusController.js";
import searchController from "../controllers/searchController.js";
import languageController from "../controllers/languageController.js";
import updateCitizenController from "../controllers/updateCitizenController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/homepage").get(AuthController.getHome);
router.route("/logout").get(AuthController.logout);

router
  .route("/citizens")
  .get(
    AuthController.protect,
    AuthController.ensureActiveUser,
    AuthController.getAllDirectory,
  )
  .post(AuthController.Signup);

router
  .route("/citizens/active")
  .get(
    AuthController.protect,
    AuthController.isAdmin,
    AuthController.ensureActiveUser,
    AuthController.getActiveUsers,
  );
router
  .route("/citizens/inactive")
  .get(
    AuthController.protect,
    AuthController.isAdmin,
    AuthController.ensureActiveUser,
    AuthController.getInactiveUsers,
  );
router.route("/citizens/:id").get(AuthController.getCitizenById);
router
  .route("/citizens/:id/active")
  .patch(
    AuthController.protect,
    AuthController.isAdmin,
    AuthController.ensureActiveUser,
    AuthController.activateAccount,
  );
router
  .route("/citizens/:id/inactive")
  .patch(
    AuthController.protect,
    AuthController.isAdmin,
    AuthController.ensureActiveUser,
    AuthController.deActivateAccount,
  );

router
  .route("/citizens/:id")
  .get(AuthController.protect, updateCitizenController.getCitizen)
  .patch(AuthController.protect, updateCitizenController.updateCitizenData);

router
  .route("/citizens/:id/status")
  .put(
    AuthController.protect,
    AuthController.ensureActiveUser,
    shareStatusController,
  );
router
  .route("/citizens/:id/language")
  .put(
    AuthController.protect,
    AuthController.ensureActiveUser,
    languageController,
  );

router
  .route("/search/:key")
  .get(
    AuthController.protect,
    AuthController.ensureActiveUser,
    searchController,
  );
router
  .route("/citizens/:id")
  .get(AuthController.protect, updateCitizenController.getCitizen)
  .patch(AuthController.protect, updateCitizenController.updateCitizenData);
router
  .route("/citizens/:id/role")
  .patch(
    AuthController.protect,
    AuthController.isAdmin,
    AuthController.ensureActiveUser,
    updateCitizenController.updateCitizenRole,
  );

router
  .route("/citizens/:id/password")
  .patch(
    AuthController.protect,
    AuthController.ensureActiveUser,
    updateCitizenController.updateCitizenPassword,
  );

router
  .route("/citizens/:id/profile")
  .patch(
    AuthController.protect,
    upload.single("image"),
    updateCitizenController.updateCitizenProfilePicture,
  );
router
  .route("/citizens/:id")
  .get(AuthController.protect, updateCitizenController.getCitizen)
  .patch(AuthController.protect, updateCitizenController.updateCitizenData);

export default router;
