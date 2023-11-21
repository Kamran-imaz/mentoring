const router=require('express').Router()
const studentModel=require('../../models/StudentModel')
const fetchMentor=require('../../middlewares/fetchMentor')
router.get('/',fetchMentor,async(req,res)=>{
    try{
        const fetchStudent=await studentModel.Student.find({},'name rollNo -_id')
        if(fetchStudent){
            res.json({
                success:true,
                message:fetchStudent
            })
        }
        else{
            res.json({
                success:false,
                message:"no user found"
            })
        }
    }
    catch(err){
        res.json({
            success:false,
            message:"un-identified error!!!"
        })
        console.log(err)
    }
})

module.exports=router