var express = require('express'),
    path    = require('path'),
    app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});
app.use('/assets', express.static(path.join(__dirname, '/dist/assets')));

app.listen(8000, function () {
  console.log('listening on port 8000!');
});
