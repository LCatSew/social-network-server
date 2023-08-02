const {Schema, model} = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, trimmed: true, required: true },
        email: { type: String, unique: true,
            validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address.',
            },
            required: true },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;