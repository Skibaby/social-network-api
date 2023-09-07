const { User, Thought } = require('../models');

module.exports = {

  async getUsers(req, res) {
    try {
      const users = await User.find({});
      console.log(users)
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }

  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v');
        res.json(user)

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

    }
    catch (err) {
      console.log(err)
    }

  },

  async createUser(req, res) {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email
      });
      res.status(200).json(user);

    } catch (err) {
      console.log(err)
      res.send(err)
    }
  },

  async updateUser(req, res) {
    let id = req.params.id
    try {
      const user = await User.findByIdAndUpdate(id, { username: req.body.username, email: req.body.email });

      res.json({msg: "User Updated!!"})

    } catch (err) {
      console.log(err)
      res.send(err)
    }
  },

  async deleteUser(req, res) {
    let id = req.params.id
    try {
      const user = await User.findByIdAndDelete(id)
      res.json({msg: "User has been deleted"})
    } catch (err) {
      console.log(err)
    }
  },

  async addFriend(req, res) {
    let userId = req.params.userId;
    let friendsId = req.params.friendsId;
    try {
     const addedFriend =  await User.findByIdAndUpdate(userId, {
        $push: {
          friends: friendsId
        }
      }, {
        new: true
      })

      const userWithFriends = await addedFriend.populate("friends")
      res.json(userWithFriends)
    } catch (err) {
      console.log(err)
    }
  },

  async deleteFriend(req, res) {
    let userId = req.params.userId;
    let friendsId = req.params.friendsId;

    try {
      const deleteFriend =  await User.findByIdAndUpdate(userId, {
        $pull: {
          friends: friendsId
        }
      }, {
        new: true
      })

      const currentFriends = await deleteFriend.populate("friends")
      res.json(currentFriends)
    } catch (err) {
      console.log(err)
    }
  }
}
