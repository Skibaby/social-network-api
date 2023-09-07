const { User, Thought } = require('../models');

module.exports = {

async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},

async getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')

    res.json(thought)

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' })
    }

  }
  catch (err) {
    res.status(500).json(err);
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
  try {
    let thoughtId = req.params.thoughtId
    const thought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText: req.body.thoughtText, username: req.body.username })

    res.json({ msg: "Thought successfully upddated." })
  } catch (err) {
    res.send(err)
  }
},

async deleteThought(req, res) {
  try {
    let thoughtId = req.params.thoughtId
    const thought = await Thought.findByIdAndDelete(thoughtId);

    res.json({ thought: "Thought was deleted" })
  } catch {
    res.status(500).json(err);
  }
},

async addReaction(req, res) {
  let thoughtId = req.params.thoughtId;

  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, {
      $push: {
        reactions:
        {
          reactionBody: req.body.reactionBody,
          username: req.body.username
        }
      }
    },
    {
      new: true
    })

    console.log("thought", thought);

    const subdoc = thought.reactions[0]

    console.log("my subdoc: ", subdoc)

    res.json(thought)
  } catch (err) {
    res.status(500).json(err);
  }

},

async deleteReaction(req, res) {
  let thoughtId = req.params.thoughtId
  let reactionId = req.params.reactionId

  try {
    // const thought = await Thought.findById(thoughtId);


    const thought = await Thought.findByIdAndUpdate(thoughtId, {
      $pull: {
        reactions: {
          _id: reactionId
        }
      }
    }, {
      new: true
    })

    console.log("thought DELETE: ", thought)


    res.json({ msg: "Reaction deleted" })
  } catch (err) {
    res.status(500).json(err);
  }

}
}