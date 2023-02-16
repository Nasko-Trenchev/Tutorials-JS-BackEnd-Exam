const courseService = require('../services/courseService');

exports.getCreatePage = (req, res) =>{

    res.render('create-course')
}

exports.postCreatePage = async (req, res) =>{

    const {title, description, imageUrl, duration} = req.body;
    try {
        await courseService.createCourse({title, description, imageUrl, duration, createdAt: new Date(), owner: req.user._id})
    }
    catch(err){
        console.log(err)
    }
    res.redirect('/');
}

exports.getDetailPage = async (req, res) =>{

    const course = await courseService.findCourseByID(req.params.id).lean();

    const enrolled = course.usersEnrolled.some(id=> id == req.user._id);

    const isOwner = req.user._id == course.owner;

    res.render('course-details', {course, enrolled, isOwner});
}

exports.enrollCourse = async (req, res) =>{

    try{
        await courseService.enroll(req.params.id, req.user._id,)
    }
    catch(err){
        console.log(err);
    }
    res.redirect(`/details/${req.params.id}`)
}

exports.deleteCourse = async (req, res) =>{

    try{
        await courseService.deleteCourse(req.params.id)
    }
    catch(err){

        console.log(err)
    }
    res.redirect('/');
}

exports.getEditPage = async (req, res) =>{

    const course = await courseService.findCourseByID(req.params.id).lean();

    res.render('edit-course', {course});
}

exports.postEditPage = async (req, res) =>{

    const {title, description, imageUrl, duration} = req.body;

    try{
        await courseService.editCourse(req.params.id, {title, description, imageUrl, duration})
    }
    catch(err){
        errors = Object.keys(err.errors).map(key => err.errors[key].message)
        return res.render('edit-course', {error: errors[0]})
    }
    res.redirect(`/details/${req.params.id}`)
}