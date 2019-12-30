const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
//our database
const config = require('./config/database');

mongoose.Promise = global.Promise;
const app = express();
const port = 3000;
//connect to db
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
  console.log('connected to db'+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('err is '+err);
  });
//cors middleware
app.use(cors());
//bodyparser middleware
app.use(bodyParser.json());
//lets initialise passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

var users = require('./routes/users');
app.use('/users',users);

app.use(express.static(path.join(__dirname,'public')));
//default route
app.get('/',(req,res)=>{
   res.send('hello world');
});


app.listen(port,()=>{
    console.log('server running on '+port);
})