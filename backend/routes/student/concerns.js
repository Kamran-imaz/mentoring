const router = require('express').Router();
const fetchStudent = require('../../middlewares/fetchStudent');
const StudentModel = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
    const { query } = req.body.addressingConcerns;
    try {
        const id = req.student.id;
        const checkStudent = await StudentModel.Student.findById(id);

        if (query && query.length >= 10) {
            if (checkStudent) {
                let maxCounter = 0;

                // Find the maximum counter value in the addressingConcerns array
                checkStudent.addressingConcerns.forEach(entry => {
                    if (entry.i > maxCounter) {
                        maxCounter = entry.i;
                    }
                });

                // Increment the maxCounter to set the new counter value (i)
                const newCounter = maxCounter + 1;

                // Add the new entry with the incremented counter value
                checkStudent.addressingConcerns.push({
                    query: query,
                    form_no: newCounter,
                    approvalStatus: false
                });

                await checkStudent.save();

                return res.json({
                    success: true,
                    message: "Your query has been saved!!!"
                });
            } else {
                return res.json({
                    success: false,
                    message: "No user found"
                });
            }
        } else {
            return res.json({
                success: false,
                message: "Your query is too short"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
});

module.exports = router;