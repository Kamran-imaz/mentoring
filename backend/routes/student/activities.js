const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const StudentModel = require("../../models/StudentModel");
const fetchStudent = require("../../middlewares/fetchStudent");

router.post("/addLateArrival", [
    body("date", "Enter Valid Date").isNumeric(),
    body("reason", "Enter Valid Reason").isString().isLength({ min: 8, max: 100 }),
    body("period", "Enter Valid Period").isNumeric().matches(/^[1-6]$/),
    body("semester", "Enter Valid Semester").isNumeric()],
    fetchStudent, async (req, res) => {
        let success = false
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() })
        }
        try {
            let id = req.student.id
            const student = await StudentModel.Student.findById(id)
            if (!student) {
                return res.status(404).json({ success, message: "Student Not Found" })
            }
            const { date, reason, period, semester } = req.body
            const existingLateArrival = student.lateArrivals.find(lateArrival => lateArrival.date === date && lateArrival.period === period)
            if (existingLateArrival) {
                return res.status(400).json({ success, message: "A late arrival already exists for this date and period" })
            }
            student.lateArrivals.push({ date, reason, period, semester })
            await student.save();
            success = true
            return res.status(200).json({ success, student })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    })

router.delete("/deleteLateArrival/:lateArrivalId", fetchStudent, async (req, res) => {
    let success = false;
    try {
        const student = await StudentModel.Student.findById(req.student.id);
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        const lateArrival = student.lateArrivals.find(lateArrival => lateArrival.id === req.params.lateArrivalId);
        if (!lateArrival) {
            return res.status(404).json({ success, message: "Late Arrival Not Found" });
        }
        student.lateArrivals = student.lateArrivals.filter(lateArrival => lateArrival.id !== req.params.lateArrivalId);
        await student.save();
        success = true;
        return res.status(200).json({ success, student });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
})

module.exports = router;