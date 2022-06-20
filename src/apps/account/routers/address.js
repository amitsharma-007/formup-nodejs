const router = require("express").Router();
const { authorization } = require("../../../utils/middleware");

router
  .route("/address")
  .post(authorization, require("../controllers/address").postAddress)
  .get(authorization, require("../controllers/address").getAddress)
  .put(authorization, require("../controllers/address").updateAddress)
  .delete(authorization, require("../controllers/address").deleteAddress);

module.exports = router;
