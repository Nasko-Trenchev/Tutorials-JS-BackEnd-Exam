const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
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