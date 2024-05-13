const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost:27017/multimedia-manager-app', {

})
.then(() => {
  console.log('Database connected');
})