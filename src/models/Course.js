const mongoose = require('mongoose');

const CourseShema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
    imgUrl: {
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

const Course = mongoose.model('Course', CourseShema);

module.exports = Course;