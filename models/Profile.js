const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String,
        require: true
    },
    finder: {
        type: Boolean
    },
    adopter: {
        type: Boolean
    },
    company: {
        type: Boolean
    },
    social: {
        facebook:{
            type: String
        },
        twitter:{
            type: String
        },
        instagram: {
            type: String
                    }
    }


});

mongoose.Schema.Types.Boolean.convertToFalse.add('');

module.exports = Profile = mongoose.model('profile', ProfileSchema);