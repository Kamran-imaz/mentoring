const mongoose = require("mongoose");

const lateArrivalSchema = new mongoose.Schema({
    date: {
        type: Number,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
    // file: {
    //     type: BSON,
    //     required: true
    // },
});

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "password",
        required: true
    },
    college: {
        type: String,
        default: "CBIT, Hyderabad",
    },
    branch: {
        type: String,
        required: true
    },
    lateArrivals: [lateArrivalSchema]
});


const StudentModel = mongoose.model('student', studentSchema);

module.exports = {
    Student: StudentModel
};
