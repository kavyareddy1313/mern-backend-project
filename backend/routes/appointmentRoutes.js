const router = require("express").Router();
const {
    createAppointment,
    getAppointments,
    updateStatus
} = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createAppointment);
router.get("/", auth, getAppointments);
router.put("/:id", auth, updateStatus);

module.exports = router;
