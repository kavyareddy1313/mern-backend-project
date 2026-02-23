
const router = require("express").Router();
const { register, login, getDoctors } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/doctors", auth, getDoctors);

module.exports = router;
