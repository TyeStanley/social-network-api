const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

// Create a schema for our user data
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: function(value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              value
            );
          }
        },
      ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Virtual to return the user's friend list length
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

// Creat the User model with the UserSchema
const User = model('User', UserSchema);

// Export the User model
module.exports = User;