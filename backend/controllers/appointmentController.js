
const Appointment = require("../models/Appointment");



exports.createAppointment = async (req, res) => {
    try {
        if (req.user.role !== "patient")
            return res.status(403).json({ msg: "Only patients can book appointments" });

        const { Department, doctorName, date, timeSlot } = req.body;

        const appt = await Appointment.create({
            Department,
            doctorName,
            patientName: req.user.name, 
            date,
            timeSlot,
            status: "pending"
        });
        res.json(appt);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.getAppointments = async (req, res) => {
    try {
        let appointments;

        if (req.user.role === "patient") {
            
            appointments = await Appointment.find({ patientName: req.user.name });
        }
        else if (req.user.role === "doctor") {
            
            appointments = await Appointment.find({ doctorName: req.user.name });
        }

        res.json(appointments);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        if (req.user.role !== "doctor")
            return res.status(403).json({ msg: "Only doctors can update appointment status" });

        const { status } = req.body;
        const normalizedStatus = status.toLowerCase();

        if (!["approved", "rejected"].includes(normalizedStatus))
            return res.status(400).json({ msg: "Invalid status" });

        const appt = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: normalizedStatus },
            { new: true }
        );

        if (!appt)
            return res.status(404).json({ msg: "Appointment not found" });

        res.json(appt);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
