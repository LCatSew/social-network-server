const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser).put(addFriend).delete(removeFriend);