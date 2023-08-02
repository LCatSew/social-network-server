const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
    thoughtText: { type: String, minlength: 1, maxlength: 280}, //required: true},
    createdAt: { type: Date, default: Date.now },
    // username: { type: String, required: true },
    reactions: [{ type: [String]}],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;