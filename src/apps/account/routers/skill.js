const router = require("express").Router();
const { authorization } = require("../../../utils/middleware");

router
  .route("/skill")
  .post(authorization, require("../controllers/skill").postSkill)
  .get(authorization, require("../controllers/skill").getSkill)
  .put(authorization, require("../controllers/skill").updateSkill)
  .delete(authorization, require("../controllers/skill").deleteSkill);

module.exports = router;
