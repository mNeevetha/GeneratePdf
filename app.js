var express = require('express');
var app = express();
const aps = require('./API');
const apppdf = require('./apppdf');
var bodyParser = require('body-parser');
var path = require('path');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Routes
app.get('/', function(req, res) {
  res.send('Hello World!');
});

//Pdf download location
//app.use('/APSDownloads', express.static('APSDownloads'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/APSDownloads')));

app.use(bodyParser.json());
app.use('/api', aps);
app.use('/pdf', apppdf);
// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on localhost:'+ port);

// // error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.get('/APSDownloads', function (req, res) {
  res.sendFile(path.join(__dirname, '/APSDownloads/', 'APSReport1501152671998.pdf'));
})

module.exports = app;