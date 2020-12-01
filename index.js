let express = require('express');
//console.log(express);
let mongoose = require('mongoose');

let app = express();

// third party middleware

let helmet = require('helmet');
let morgan = require('morgan');

//middleware

app.use(express.json());

// in built middleware

app.use(express.static('public'));
app.use(helmet());


let middlewareWork = require('./middleware/middleware');
let config = require('config');
let port = process.env.PORT || 4200

let courses = require('./routes/courses');

console.log(`mode : ${process.env.NODE_ENV}`);
console.log(`default mode : ${app.get('env')}`);
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

console.log(`default config:${config.get('name')}`);
console.log(`mode_email:${config.get('email')}`);
//console.log(`password:${config.get("password")}`);

app.use('/api', courses);

// mongo connection

mongoose.
connect('mongodb://localhost:27017/mongodemo-v2',{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log(`connected to db`))
.catch((error) => console.log(`something went wrong, ${error.message}`))

//express connection
app.listen(port, () => console.log(`port is working on ${port}`));