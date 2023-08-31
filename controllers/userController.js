const { User, Thought } = require('../models');

module.exports = {

  async getUsers( req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
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

    },

    async updateUser(req, res) {
      let thoughtParm = req.params.thoughtId
    },

    async deleteUser(req, res) {

    },

    async addFriend(req, res) {
      
    },

    async deleteFriend(req, res) {

    }
}