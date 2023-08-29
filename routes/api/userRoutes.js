const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('express').Router();

// api/users
router.route('/')
  .get(getUsers)
  .post(createUser)
// api/users/:userId
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);
//
router.route('/:userId/friends/friendsId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;







