const { Router } = require("express");
const router = Router();
const { getError404 } = require("../controllers/api.controller");

// Error 404
router.get("*", getError404);

module.exports = router;
