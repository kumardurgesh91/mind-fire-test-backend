const mongoose = require('mongoose');
var crypto = require('crypto');
// Setup schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.nowÏ
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt,
            1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
            this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};
// Export Contact model
const UserModel = module.exports = mongoose.model('users', userSchema);
