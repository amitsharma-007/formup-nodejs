const router = require("express").Router();
const { authorization } = require("../../../utils/middleware");

router
  .route("/education")
  .post(authorization, require("../controllers/education").postEducation)
  .get(authorization, require("../controllers/education").getEducation)
  .put(authorization, require("../controllers/education").updateEducation)
  .delete(authorization, require("../controllers/education").deleteEducation);

module.exports = router;
