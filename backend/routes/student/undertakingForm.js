const router = require('express').Router();
const fetchStudent=require('../../middlewares/fetchStudent')
const undertaking = require('../../models/StudentModel');

router.post('/',fetchStudent ,async (req, res) => {
  const { reason, address } = req.body.undertakingForm;
  const id=req.student.id
  try {
    const findForm = await undertaking.Student.findById(id);

    if (findForm) {
      // If it exists, update the document by appending to the pdfs array
      findForm.undertakingForm.push({
        reason: reason,
        address: address,
      });
      await findForm.save();

      res.json({
        message: 'Saved to Existing Document',
        form: findForm
      });
    } else {
      // If it doesn't exist, create a new document
      

      res.json({
        message: 'Please Signup again',
        form: newForm
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
