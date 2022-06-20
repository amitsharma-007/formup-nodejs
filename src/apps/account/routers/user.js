const router = require("express").Router();
const { authorization } = require("../../../utils/middleware");
const { uploadImage } = require("../../../utils/upload");

router
  .route("/user")
  .post(authorization, require("../controllers/user").postUser)
  .get(authorization, require("../controllers/user").getUser)
  .put(authorization, require("../controllers/user").updateUser)
  .delete(authorization, require("../controllers/user").deleteUser);

router
  .route("/users")
  .get(authorization, require("../controllers/user").filterUsers);

router
  .route("/updateAvatar")
  .post(
    authorization,
    uploadImage.single("avatar"),
    require("../controllers/user").updateAvatar
  );
router
  .route("/updateCover")
  .post(
    authorization,
    uploadImage.single("cover"),
    require("../controllers/user").updateCover
  );

module.exports = router;
