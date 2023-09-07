const { schema, model, Schema } = require('mongoose');

const formatDate = () => {
  return `${new Date().getUTCMonth()+ 1}/${new Date().getUTCDate()}/${new Date().getUTCFullYear()}`;
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true ,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt : {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false,
    
    }
);

// const Reaction = model(Reaction, reactionSchema)

module.exports = reactionSchema;
