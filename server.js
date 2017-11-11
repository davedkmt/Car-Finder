// Dependecies/ npm packages
// -----------------------------------------------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

// Initial port
// -----------------------------------------------------------------------------
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// localhost to the main page
// -----------------------------------------------------------------------------

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// localhost to the survey page
// -----------------------------------------------------------------------------

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});


// Initial matches
// -----------------------------------------------------------------------------

var answer = [{
    "name": "Mickey Mouse",
    "photo": "https://www.disneyclips.com/imagesnewb/images/mickey_happy.gif",
    "scores": [
      "1",
      "5",
      "3",
      "3",
      "3",
      "4",
      "1",
      "3",
      "4",
      "4"
    ]
  },
  {
    "name": "Scooby-doo",
    "photo": "https://vignette.wikia.nocookie.net/cartoons/images/6/67/Scooby-doo.png/revision/latest?cb=20131106060946",
    "scores": [
      "5",
      "2",
      "3",
      "2",
      "5",
      "3",
      "4",
      "4",
      "2",
      "2"
    ]
  }
];

// Json display
// -----------------------------------------------------------------------------

app.get("/api/answer:answer?", function(req, res) {
  var chosen = req.params.answer;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < answer.length; i++) {
      if (chosen === answer[i].routeName) {
        return res.json(answer[i]);
      }
    }

    return res.json(false);
  }
  return res.json(answer);
});


app.post("/api/answer:answer?", function(req, res) {
  var close = 0;
  var right = {
    name: "",
    photo: "",
    difference: 51
  };

  for (var i = 0; i < answer.length; i++) {
    for (var j = 0; j < answer[i].scores[j]; j++) {

      close += Math.abs(parseInt(req.body.scores[j]) - parseInt(answer[i].scores[j]));

      if (close <= right.difference) {
        right.name = answer[i].name;
        right.photo = answer[i].photo;
        right.difference = close;

      }

    }
  }

  answer.push(req.body);

  res.json(right);

  // console.log(right);
});


// Checking the port with console
// -----------------------------------------------------------------------------

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);

});
