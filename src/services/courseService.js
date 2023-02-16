const Course = require('../models/Course');

exports.createCourse = (data) => Course.create(data);

exports.getAllCourses = () => Course.find({});

exports.findCourseByID = (id) => Course.findById(id);

exports.enroll = async (courseID, userId) => {

    const course = await this.findCourseByID(courseID);
    course.usersEnrolled.push(userId);
    await course.save();
}

exports.deleteCourse = (id) => Course.findByIdAndDelete(id);

exports.editCourse = (id, data) => Course.findByIdAndUpdate(id, data)