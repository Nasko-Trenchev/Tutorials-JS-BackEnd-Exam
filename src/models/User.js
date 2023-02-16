const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minLength: 5,
        match: [/^[\w-]+$/, "Username should be only letters and digits"],
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        match: [/^[\w-]+$/, "Password should be only letters and digits"],
    }
})

userShema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

userShema.method('validatePassword', function(password) {

    return bcrypt.compare(password, this.password);

})

const User = mongoose.model('User', userShema);

module.exports = User;