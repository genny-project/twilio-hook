require('dotenv').config();

const client = require('twilio')(process.env.SID, process.env.TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const http = require('http');
const express = require('express');
const { exec } = require('child_process');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/twilio', (req, res) => {
  let response = new MessagingResponse();
    exec(`./godaddy.sh ${req.body.Body}`, ( err, stdout, stderr ) => {
	  console.log( stdout );
	  response.message(`Your SaaS is ready. https://${req.body.Body.split(' ')[0]}.outcome-hub.com`);
	  res.writeHead(200, {'Content-Type': 'text/xml'});
	  res.end(response.toString());
  });
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});