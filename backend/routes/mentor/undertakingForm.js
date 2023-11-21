const router=require('express').Router()
const fetchMentor=require('../../middlewares/fetchMentor')
const studentModel=require('../../models/StudentModel')
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

module.exports=router