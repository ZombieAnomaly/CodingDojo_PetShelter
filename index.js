var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var path = require('path');
var server = app.listen(8373, function() {console.log("listening on port 8373");});

require('./server/config/mongoose.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './AngularApp/dist/AngularApp')));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/routes.js')(app)