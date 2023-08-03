const { User, Thought } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find();
                // .populate({
                //     path: 'thoughts',
                //     select: '-__v',
                // })
                // .select('-__v')
                // .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.usersId })
                // .populate({
                //     path: 'thoughts',
                //     select: '-__v',
                // })
                .select('-__v');
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // createUser
    async createUser(req, res) {
        console.log(req.body);
        try {
            const dbUserData = await User.create({
                username: req.body.username ,
            });
            res.status(200).json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add friend
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update user by id (PUT)
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user by id
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            // remove associated thoughts
            await Thought.deleteMany({ username: dbUserData.username });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;