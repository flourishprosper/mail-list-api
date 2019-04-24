//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/", function(req,res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
  members: [
    {email_address: email, status: "subscribed", merge_fields: {"FNAME": firstName,"LNAME": lastName}}
  ]
};

var jsonData = JSON.stringify(data);

var option = {
  url: "https://us20.api.mailchimp.com/3.0/lists/2e975a313e",
  method: "POST",
  headers: {
    "Authorization" : "FlourishProsper 5e49862ec9874ce9881ec566de8e5a3d-us20"
  },
    body: jsonData
};
request(option, function(error, response, body){
  if(error){
    console.log(error);
  } else {
    console.log(response.statusCode);
    console.log(firstName + " " + lastName + " just subscribed with the email address: " + email);
  }
});
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
  console.log("Someone just visited the website!");
});

app.listen(3000,function(){
  console.log("Server listening on port 3000!");
});


//Mail Chimp API Key:  5e49862ec9874ce9881ec566de8e5a3d-us20
//Mail Chimp List ID: 64367
// Mail Chimp Audince ID: 2e975a313e
