const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // GET thoughts by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: 'user',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },



  // getThoughtById(req, res) {
  //   console.log(req.params.id);
  //   Thought.findOne({ _id: req.params.id})
  //     .then(dbData => {
  //       console.log(dbData);
  //       res.json(dbData);
  //     })
  //     .catch(err => res.status(400).json(err));
  // },


  // getThoughtById(req, res) {
  //   Thought.findOne({ _id: req.params.id })
  //     .then(dbThoughtData => {
  //       console.log(dbThoughtData);
  //       res.json(dbThoughtData)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },

  // POST a new thought and adds thought to USER 
  createThought(req, res) {
    Thought.create(req.body)
      .then(dbThoughtData => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData.id  } },
          { new: true }
        );
        console.log(`${body.username}, you have successfully created a new thought!`)
      })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
  },

  // UPDATE a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  // Delete a Thought
  deleteThought({ params }, res) {
    console.log(params);
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'Thought successfully deleted!'})
        }
        res.json(deletedThought);
      })
        .catch(err => res.status(400).json(err));
  }
}

module.exports = thoughtController;