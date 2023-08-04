const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router
    .route('/:usersId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;