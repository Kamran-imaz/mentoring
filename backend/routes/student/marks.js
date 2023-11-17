const router=require('express').Router()
const studentSchema=require('../../models/StudentModel')
const fetchStudent=require('../../middlewares/fetchStudent')
router.post('/',fetchStudent,async(req,res)=>{
    
    const {semester,gpa,backlogs,subject,overallgpa}=req.body.marks;
    const id=req.student.id
    // console.log(id)
    try{
    const checkStudent=await studentSchema.Student.findById(id)
    if(checkStudent){
        checkStudent.marks.push({
            semester:semester,
            gpa:gpa,
            backlogs:backlogs,
            subject:subject,
            overallgpa:overallgpa
        })
        checkStudent.save()
        res.json({
            message:"successfully Updated"
        })
    }
    else{
        res.json({
            message:"user does not exists"
        })
    }
}
    

catch(err){
    // console.log(err)
    console.log(err.message)
}
})


module.exports=router