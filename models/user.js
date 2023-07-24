const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true, trimmed: true, required: true },
        email: { type: String, unique: true,
            validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address.',
            },
            required: true },
        thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;