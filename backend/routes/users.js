
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((request, response) => {
  //get list of all users from the database
  User.find()
    .then(users => response.json(users))
    .catch(error => response.status(400).json('Error: ' + error));
});

/*
Sample Request:
{
    "username": "Sean"
}
*/
router.route('/add').post((request, response) => {
  const username = request.body.username;
  const newUser = new User({username});
  //save new user to database
  newUser.save()
    .then(() => response.json('User added!'))
    .catch(error => response.status(400).json('Error: ' + error));
});

module.exports = router;