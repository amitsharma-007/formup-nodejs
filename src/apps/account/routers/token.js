const router = require("express").Router();

router.route("/request").post(require("../controllers/token").request);
router.route("/verify").post(require("../controllers/token").verify);
router.route("/refresh").post(require("../controllers/token").refresh);

module.exports = router;
