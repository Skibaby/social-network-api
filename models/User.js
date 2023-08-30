const { Schema, Types } = require('mongoose');

const reactionSchema = new schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
  },
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (str) {
          return /^([a-z0-9_-]+)@([\da-a\.-]+)\.([a-z\.]{2,6})$/.test(str);
        },
      },

      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        }
      ],
    
    },
    toJSON: {
      virtuals: true,
    },
    id: false,
  },

);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;