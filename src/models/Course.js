const mongoose = require('mongoose');

const CourseShema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 20
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "Invalid URL"]
    },
    duration:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

const Course = mongoose.model('Course', CourseShema);

module.exports = Course;