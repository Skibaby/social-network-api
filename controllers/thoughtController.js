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
      let thoughtId = req.params.thoughtId 
      const thought  = Thought.findByIdAndUpdate(thoughtId, {thoughtText: req.body.thoughtText, username: req.body.username})

      res.json(thought)
    },

    async deleteThought(req, res) {
      let thoughtId = req.params.thoughtId 
      const thought = Thought.findByIdAndDelete(thoughtId);

      res.json(thought)
    },

    async addReaction(req, res) {
      let thoughtId = req.params.thoughtId 

      const thought = Thought.findById()

      thought.reactions.push({
        reactionBody: req.body.reactionBody,
        username: req.body.username
      })

      res.json(thought)
    },

    async deleteReaction(req, res) {
      let thoughtId = req.params.thoughtId 
      let reactionId = req.params.reactionId 

      const thought = Thought.findById(thoughtId);
      // thought.reactions
      res.json({still: "working on it"})
    }
}

//Model.findBy()
//Model.findByIdAndDelete()
//Model.findByIdAndUpdate()