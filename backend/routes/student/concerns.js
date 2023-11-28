const router = require('express').Router();
const fetchStudent = require('../../middlewares/fetchStudent');
const StudentModel = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
    const { date,query } = req.body.newForm;
    try {
        const id = req.student.id;
        const checkStudent = await StudentModel.Student.findById(id);
        const isDateExists=checkStudent.addressingConcerns.some((ele)=>ele.date===date)
        console.log(!isDateExists)
        if (query && query.length >= 10) {
            if (checkStudent && !isDateExists) {
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
                    date:date,
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
                    message: "Only one form can be submitted on one day!!!"
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

router.get('/getHistory', fetchStudent, async (req, res) => {
    let id = req.student.id;
    try {
        const checkStudent = await StudentModel.Student.findById(id);
        
        if (checkStudent) {
            res.status(200).json({
                success: true,
                message: checkStudent
            });
        } else {
            res.json({
                success: false,
                message: "Student does not exist!!!"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
        console.log(err);
    }
});

module.exports = router;