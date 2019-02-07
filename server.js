var path = require('path');
var express = require('express');
var cors = require('cors')

var app = express();


app.use(cors(), express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 80);

const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
