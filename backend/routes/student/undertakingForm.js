const router = require('express').Router();
const fetchStudent=require('../../middlewares/fetchStudent')
const undertaking = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
  const { reason, address } = req.body.undertakingForm;
  const id = req.student.id;

  try {
    const findForm = await undertaking.Student.findById(id);

    if (findForm) {
      let maxFormNo = 0;

      // Find the maximum form_no in the undertakingForm array
      findForm.undertakingForm.forEach(form => {
        if (form.form_no > maxFormNo) {
          maxFormNo = form.form_no;
        }
      });

      // Increment the maxFormNo to set the new form_no
      const newFormNo = maxFormNo + 1;

      // Push the new form with the incremented form_no
      findForm.undertakingForm.push({
        form_no: newFormNo,
        reason: reason,
        address: address,
        approvalStatus: false
      });

      await findForm.save();

      return res.json({
        message: 'Saved to Existing Document',
        form: findForm
      });
    } else {
      // Handle case when the student document is not found
      return res.json({
        message: 'Please Signup again'
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
