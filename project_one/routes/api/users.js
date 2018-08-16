const express = require('express');
const router = express.Router();  
const User = require('../../models/User'); 
const bcrypt = require('bcryptjs');

router.get('/test', (req,res) => res.json({
  msg:'users work'
}));

// register a new user
router.post('/register', (req,res) =>{
  // find a email that matches the request.body.email
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(user){
      return res.status(400).json({
        email:'Email previously takken'
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        picture: 'no-picture',
        password: req.body.password
      });

      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err = console.log(err));
        });
      });
    }
  });
});


module.exports = router;
