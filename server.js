/**
 * Created by Ishay on 09/03/2017.
 */

var express = require('express');
var path = require('path');
var http = require('http');


const app = new express();
app.use(express.static(path.join(__dirname, 'src/static')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/static/index.html'));
});


const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'production';

var server = http.createServer(app);
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});