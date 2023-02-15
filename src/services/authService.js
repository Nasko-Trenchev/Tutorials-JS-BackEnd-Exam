const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config')


exports.register = async (username, password, rePassword) => {
    
   const existingUser = await this.findByUsername(username);

   if(existingUser){

        throw "This user exists!";
    }

    if(password !== rePassword){

        throw "Password missmatch!";
    }
    await User.create({username, password})
    
    return this.login(username, password);
};

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.login = async (email, password) => {

    const user = await this.findByEmail(email);

    if(!user){

        throw "User or password don`t match!"
    }

    const isValid = await user.validatePassword(password);

    if(!isValid){

        throw "User or password don`t match!"
    }

    const payload = {_id: user._id, user: user.username, email: user.email}
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '2h'})
    return token;
}
