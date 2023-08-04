const { User, Thought } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find();
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
            const dbUserData = await User.create(req.body);
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
                { _id: req.params.usersId },
                // { $set: req.body }, - this is returning undefined for some reason.
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
            const dbUserData = await User.findOneAndDelete({ _id: req.params.usersId });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            // remove associated thoughts
            await Thought.deleteMany({ username: dbUserData.username });
            // res.json(dbUserData);
            res.json({message: 'User has been deleted'});
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