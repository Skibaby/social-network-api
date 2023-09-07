const { Schema, model, Types} = require('mongoose');
const reactionSchema = require('./reaction');

const formatDate = () => {
  return `${new Date().getUTCMonth()+ 1}/${new Date().getUTCDate()}/${new Date().getUTCFullYear()}`;
}


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 128
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,

    },

    username: {
      type: String, 
      required: true,
    },

    reactions: [reactionSchema] , 


  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: true,

  }

);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
