const courseService = require('../services/courseService');

exports.getCreatePage = (req, res) =>{

    res.render('create-course')
}

exports.postCreatePage = async (req, res) =>{

    const {title, description, imageUrl, duration} = req.body;
    try {
        await courseService.createCourse({title, description, imageUrl, duration, createdAt: new Date()})
    }
    catch(err){
        console.log(err)
    }
    res.redirect('/');
}

exports.getDetailPage = async (req, res) =>{

    const course = await courseService.findCourseByID(req.params.id).lean();

    const enrolled = req.user.enrolledCourses.some(id=> id == req.params.id);

    const owner = 
    res.render('course-details', {course, enrolled});
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