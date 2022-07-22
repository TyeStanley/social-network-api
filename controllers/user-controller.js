const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // GET one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // PUT update user by id
  updateUser({params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(deletedUser => {
        // Remove thoughts from deleted user
        Thought.deleteMany({ username: deletedUser.username })
        .catch(err => res.json(err));
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Successfully deleted User!' });
          return;
        }

        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST to add a new friend /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, 
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // Delete to remove friend /api/users/:userId/friends/:friendId
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  }
}

// Export the userController
module.exports = userController;