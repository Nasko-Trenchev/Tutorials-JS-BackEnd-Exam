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

exports.editCourse = (id, data) => Course.findByIdAndUpdate(id, data);

exports.searching = (search) => {
    const query = {};
    query.title = new RegExp(search, 'i');
    return Course.find(query).sort({ createdAt: 1 }).lean()
}