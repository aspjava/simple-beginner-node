//   Import Express
const express = require('express');

const mongoose = require('mongoose');

const {check, validationResult} = require('express-validator');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd')
});



//   Grab the router from Express
const router = express.Router();

const Registration = mongoose.model('Registration')

//   Use the router to respond to any requests to the root URL
//   with an "It works!" message
//   (in this case, it is http://localhost:3000) 

router.get('/', (req, res) => {
  //res.send('It works!');

  //  Below uses the render method on Express' response object
  //  to send the rendered view to the client.
  res.render('form', { title: 'Registration form'});
});

router.post('/', 
  [ //   route-handlers
    check('name')
      .isLength({min: 1})
      .withMessage('Please enter a name'),
    check('email')
      .isLength({min: 1})
      .withMessage('Please enter an email'),
  ], 
  (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
      //res.send('Thank you for your registration')
      
      const registration = new Registration(req.body);
      
      registration.save()
        .then(() => {
          res.send('Thank you for your registration!');
        })
        .catch((error) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });

    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,              //  If validation fails, pass req.body back to the template
      });
    }
});


router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registration', registrations});
    })
    .catch(() => {
      res.send('Sorry! Something went wrong.')
    });
}));

module.exports = router;


