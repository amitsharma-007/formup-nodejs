const router = require("express").Router();
const { authorization } = require("../../../utils/middleware");

router
  .route("/experience")
  .post(authorization, require("../controllers/experience").postExperience)
  .get(authorization, require("../controllers/experience").getExperience)
  .put(authorization, require("../controllers/experience").updateExperience)
  .delete(authorization, require("../controllers/experience").deleteExperience);

module.exports = router;
