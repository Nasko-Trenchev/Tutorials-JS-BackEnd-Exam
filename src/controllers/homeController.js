

exports.getHomePage = (req, res) => {

    if(req.logged){

       return res.render("user-home")

    }
    res.render('guest-home');
}