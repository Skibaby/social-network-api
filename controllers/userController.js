const { User, Thought } = require('../models');

module.exports = {

  async getUsers( req, res) {
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
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')

        if (!thought){
          return res.status(404).json({ message: 'No thought with that ID'})
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
      let thoughtParm = req.params.thoughtId
    },

    async deleteUser(req, res) {
      try {

      } catch (err) {
        console.log(err)
      }
    },

    async addFriend(req, res) {
      try {

      } catch (err) {
        console.log(err)
      }
    },

    async deleteFriend(req, res) {
      try {

      } catch (err) {
        console.log(err)
      }
    }
}