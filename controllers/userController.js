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
      const thought = await Thought.findOne({ _id: req.params.id })
        .select('-__v')

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
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
      const user =  User.findByIdAndUpdate(id, {username: req.body.username, email: req.body.email});

      res.json(user)
     
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  },

  async deleteUser(req, res) {
    let id = req.params.id
    try {
      const user = User.findByIdAndDelete(id)
      res.json(user)
    } catch (err) {
      console.log(err)
    }
  },

  async addFriend(req, res) {
    let userId = req.params.userId;
    let friendsId = req.params.friendsId;
    try {
      const user = User.findById(userId)
      const friend = User.findById(friendsId)

      user.friends.push(friend._id)

      const userWithFriends = user.populate("friends")
      res.json(userWithFriends)
    } catch (err) {
      console.log(err)
    }
  },

  async deleteFriend(req, res) {
    let userId = req.params.userId;
    let friendsId = req.params.friendsId;
    try {
      const user = User.findById(userId)
      const friend = User.findById(friendsId)

      user.friends.pop(friend._id)

      const userWithFriends = user.populate("friends")
      res.json(userWithFriends)
    } catch (err) {
      console.log(err)
    }
  }
}