const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config')


exports.register = async (username, password, rePassword) => {
    
    await User.create({username, password})
    
    return this.login(username, password);
};

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.login = async (username, password) => {

    const user = await this.findByUsername(username);

    const payload = {_id: user._id, user: user.username}
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '2h'})
    return token;
}
