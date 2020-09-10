const router = require('express').Router();
let Exercise = require('../models/Exercise');



// Get all exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json('Error: ' + err));
});



// Add exercise
router.route('/add').post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json('Exercise Added: ' + newExercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});



// Get an exercise by id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});



// Delete exercise by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Exercise.findByIdAndDelete({ _id: id })
    .then(() => res.json('Exercise deleted...'))
    .catch((err) => res.status(400).json('Error: ' + err));
});




// Update exercise by id
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json('Exercise updated:' + exercise))
        .catch((err) => res.status(400).json('Error:' + err));
    })
    .catch((err) => res.status(400).json('Error:' + err));
});

// router.post('/:id', (req, res) => {
//   const { username, description } = req.body;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);

//   Exercise.update(
//     { _id: req.params.id },
//     {
//       $set: {
//         username: username,
//         description: description,
//         duration: duration,
//         date: date,
//       },
//     }
//   ).then(() => res.json('Exercise Updated'));
// });

module.exports = router;
