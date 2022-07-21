const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Create a schema for our reaction data
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: { getters: true }
  }
)

// Create a schema for our thought data
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: { getters: true, virtuals: true },
    id: false
  }
);


// Create thoughtschema virtuals for the number of reactions 
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model with the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;