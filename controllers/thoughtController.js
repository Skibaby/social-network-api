const { User, Thought } = require('../models');

module.exports = {

  async getThoughts( req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }

    },

    async getSingleThought(req, res) {
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

    async createThought(req, res) {
      try {
        const thought = await Thought.create({
          username: req.body.username,
          thoughtText: req.body.thoughtText,
        });
        res.status(200).json(thought);

      } catch (err) {
        console.log(err)
        res.send(err)
      }
    },

    async updateThought(req, res) {
      let thoughtParm = req.params.thoughtId 
    },

    async deleteThought(req, res) {

    },

    async addReaction(req, res) {
      
    },

    async deleteReaction(req, res) {

    }
}