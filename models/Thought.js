const { Schema, models, Types} = require('mongoose');
const reactionSchema = required('./reaction');

const formatDate = () => {
  return `${new Date().getUTCMonth()+ 1}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`;
}


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: string,
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
      type: string, 
      required: true,
    },
    reactions: [reactionSchema] , 


  },
  {
    toJSON: {

      virtuals: true,
      getters: true,
    },
    id: false,

  }

);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});

const thought = model('thought', thoughtSchema);

module.exports = Thought;