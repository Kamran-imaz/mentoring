const router=require('express').Router()
const fetchMentor=require('../../middlewares/fetchMentor');
const StudentModel = require('../../models/StudentModel');
router.get('/',fetchMentor,async(req,res)=>{
    try{
        const {rollNo}=req.body;
        const student=await StudentModel.Student.find({rollNo},'addressingConcerns -_id')
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
            message:`error is ${err}`
        })
    }
})

module.exports=router