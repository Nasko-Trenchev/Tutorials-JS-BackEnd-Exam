const courseService = require('../services/courseService');

exports.getHomePage = async (req, res) => {

    let courses = await courseService.getAllCourses().lean();

    courses = courses.sort(function(a,b) {

        return b.createdAt - a.createdAt;
    })

    if(req.logged){

     const {search} = req.query;
     
     if(search){

      const results = courseService.searching(search);

      return res.render("user-home", {results})
     }
     return res.render("user-home", {courses})
    }

    res.render('guest-home', {courses});
}