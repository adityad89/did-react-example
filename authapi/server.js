require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var { Issuer } = require("openid-client");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

var clientPromise = Issuer.discover("https://did.app").then(function(issuer) {
  console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);
  return new issuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  });
});

app.get("/authenticate", function(req, res, next) {
    clientPromise.then(function(client) {
      var authorizationUrl = client.authorizationUrl({
        scope: "openid",
        redirect_uri: "http://localhost:4000/callback"
      });
      res.redirect(authorizationUrl);
    });
  });

  app.get("/callback", function(req, res, next) {
    clientPromise
      .then(function(client) {
        var params = client.callbackParams(req);
        return client.callback("http://localhost:4000/callback", params);
      })
      .then(function(tokenSet) {
        var claims = tokenSet.claims();
        console.log(claims);
        req.session = { userId: claims.sub };
        res.redirect("http://localhost:3000/Home");
      });
  });

app.get('/',(req,res)=> {
    res.send('Welcome');
});

app.listen(port,()=>{
    console.log('Server started on: ' + port)
})