const router = require('express').Router();
const fetchStudent = require('../../middlewares/fetchStudent');
const StudentModel = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
    const { query } = req.body.addressingConcerns;
    try {
        const id = req.student.id;
        const checkStudent = await StudentModel.Student.findById(id);
        // console.log(typeof(query))
        if (query && query.length>=10) {
            if (checkStudent) {
                checkStudent.addressingConcerns.push({
                    query: query
                });
                await checkStudent.save();
                res.json({
                    success: true,
                    message: "Your query has been saved!!!"
                });
            } else {
                res.json({
                    success: false,
                    message: "No user found"
                });
            }
        } else {
            res.json({
                success: false,
                message: "Your query is too short"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
});

module.exports = router;