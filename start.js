// To specify the database connection ".env" file in the project root
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error ${err.message}`)
  });


require('./models/Registration');



// Import the Express app we created in "app.js"
const app = require('./app')




// Tell our app to listen on port 3000 for incoming connections
// and output a message to indicate that the server is running.
const server = app.listen( 3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
} );

