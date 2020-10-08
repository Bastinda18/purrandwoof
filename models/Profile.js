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
    status: {
        type: [String]
    },
    social: {
        facebook:{
            type: String
        },
        instagram: {
            type: String
                    }
    }


});

module.exports = Profile = mongoose.model('profile', ProfileSchema);