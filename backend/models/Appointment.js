
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  Department: {
    type: String,
    required: true
  },
  doctorName: String,
  patientName: String,
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
