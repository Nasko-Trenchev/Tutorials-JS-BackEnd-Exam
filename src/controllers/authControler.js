const authService = require('../services/authService');

exports.getLogin = (req, res) =>{

    res.render('login');
}

exports.postLogin = async (req, res) =>{

    const {email, password} = req.body;
    try {
     const token = await authService.login(email, password);
     res.cookie('auth', token);
    }
    catch(err) {
        //Error handling
        // const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        //return res.render('register', {error: errors[0]})
    }
    res.redirect('/');
}

exports.getRegister = (req, res) =>{

    res.render('register')
}

exports.postRegister = async (req, res) =>{

    const {username, password, rePassword} = req.body;

    try{
        const token = await authService.register(username, password, rePassword);
        res.cookie('auth', token);
    }
    catch(err){
        //Error handling
        //return res.render('register', {error: err.message})
    }

    res.redirect('/');
}

exports.getLogout = (req, res) =>{

    res.clearCookie('auth');
    res.redirect('/');
}