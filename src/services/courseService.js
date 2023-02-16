const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = (data) => Course.create(data);

exports.getAllCourses = () => Course.find({});

exports.findCourseByID = (id) => Course.findById(id);

exports.enroll = async (courseID, userId) => {

    const course = await this.findCourseByID(courseID);
    const user = await User.findById(userId);
    course.usersEnrolled.push(userId);
    await course.save();
    user.enrolledCourses.push(courseID);
    await user.save();
}