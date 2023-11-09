const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const StudentModel = require("../../models/StudentModel")
const fetchStudent = require("../../middlewares/fetchStudent")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_Secret = process.env.JWT_SECRET;

router.post("/signup", [
    body("rollNo", "Enter Valid Roll Number").isLength({ min: 12, max: 12 }),
    body("name", "Enter Valid Name").isString(),
    body("password", "Enter Valid Password").isLength({ min: 5 }),
    body("branch", "Enter Valid Branch").isString()]
    , async (req, res) => {
        let success = false
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() })
        }
        try {
            let student = await StudentModel.Student.findOne({ rollNo: req.body.rollNo })
            if (student) {
                return res.status(400).json({ success, message: "Sorry a Student with this Roll Number already exists!" })
            }
            let salt = bcrypt.genSaltSync(10)
            let secPass = bcrypt.hashSync(req.body.password, salt)
            student = await StudentModel.Student.create({
                rollNo: req.body.rollNo,
                name: req.body.name,
                password: secPass,
                branch: req.body.branch
            })
            const data = {
                studentID: {
                    id: student.id
                }
            }
            let authToken = jwt.sign(data, JWT_Secret)
            success = true
            return res.status(200).json({ success, authToken })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    })

router.post("/login", async (req, res) => {
        let success = false
        const { rollNo, password } = req.body
        try {
            let student = await StudentModel.Student.findOne({ rollNo })
            if (!student) {
                return res.status(400).json({ success, message: "Incorrect Credentials" })
            }
            const comparePass = bcrypt.compareSync(password, student.password)
            if (!comparePass) {
                return res.status(400).json({ success, message: "Incorrect Credentials" })
            }
            const data = {
                studentID: {
                    id: student.id
                }
            }
            const authToken = jwt.sign(data, JWT_Secret)
            success = true
            return res.status(200).json({ success, authToken })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    })
    
router.post("/getStudentDetails", fetchStudent, async (req, res) => {
        let success = false
        try {
            let id = req.student.id;
            const student = await StudentModel.Student.findById(id).select("-password -__v -_id");
            success = true;
            return res.status(200).json({ success, student })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    })
    
module.exports = router