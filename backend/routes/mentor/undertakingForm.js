const router=require('express').Router()
const fetchMentor=require('../../middlewares/fetchMentor')
const StudentModel = require('../../models/StudentModel')
router.get('/',fetchMentor,async(req,res)=>{
    try{
        const {rollNo}=req.body
        const student=await studentModel.Student.find({rollNo},'undertakingForm -_id')
        if(student){
            res.status(200).json({
                success:true,
                message:student
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:"no user exists with that rollNo!!!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`error is: ${err}`
        })
    }
})

//post for the approval...
router.post('/formApproval',fetchMentor,async(req,res)=>{
    const {form_no,rollNo,approvalStatus}=req.body;
    try{
        let student=await StudentModel.Student.findOne({rollNo},'undertakingForm -_id')
        console.log(student)
        if(student){
            student.undertakingForm.forEach((obj) => {
                if (obj.form_no === form_no) {
                    obj.approvalStatus = approvalStatus;
                }
            });
            console.log(student)    
        }
        
        else{
            res.status(500).json({
                success:false,
                message:"no user found with that rollNo!!!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`error is ${err}`
        })
    }
})

module.exports=router