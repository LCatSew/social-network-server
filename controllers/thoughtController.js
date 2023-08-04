const { Thought, User } = require('../models');


const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({}).populate('reactions');
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions')
                .select('-__v');

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // createThought
    async createThought(req, res) {
        try {

            const dbThoughtData = await Thought.create(req.body);
            // const dbUserData = await User.findOneAndUpdate(
            //     { username: req.body.username },
            //     { $push: { thoughts: dbThoughtData._id } },
            //     { new: true }
            // );
            // if (!dbUserData) {
            //     res.status(404).json({ message: 'No user found with this id!' });
            //     return;
            // }
            // res.json(dbUserData);
            res.status(200).json(dbThoughtData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete Thought by id
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            // const dbUserData = await User.findOneAndUpdate(
            //     { username: dbThoughtData.username },
            //     { $pull: { thoughts: req.params.id } },
            //     { new: true }
            // );
            // if (!dbUserData) {
            //     res.status(404).json({ message: 'No user found with this username!' });
            //     return;
            // }
            res.json( {message: 'Thought has been deleted'} );
            console.log("Thought had been deleted!")

            // res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                //{ $set: req.body} - this is saying undefined for some reason
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add reaction to thought by id
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove reaction from thought
    async removeReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;
