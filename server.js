const express = require("express", "localhost");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

let buzzwords = {};
let totalScore = 0;

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello world"));

app
  .route("/buzzwords")
  .get(function(req, res) {
    res.send(buzzwords);
  })
  .post(function(req, res) {
    let word = req.body.buzzWord;
    let points = req.body.points;
    let keys = Object.keys(buzzwords);
    console.log(buzzwords);
    // console.log(points);
    if (keys.includes(word)) {
      res.send({ success: false });
    } else {
      buzzwords[word] = points;
      res.send({ success: true });
    }
  })
  .put(function(req, res) {
    let word = req.body.buzzWord;
    let points = req.body.points;
    let keys = Object.keys(buzzwords);

    if (keys.includes(word)) {
      buzzwords[word] = points;
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  })
  .delete(function(req, res) {
    let word = req.body.buzzWord;
    let keys = Object.keys(buzzwords);

    if (keys.includes(word)) {
      delete buzzwords[word];
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });

app.post("/reset", function(req, res) {
  buzzwords = {};
  totalScore = 0;
  res.send({ success: true });
});

app.post("/heard", function(req, res) {
  let word = req.body.buzzWord;
  let points = buzzwords[word];
  let keys = Object.keys(buzzwords);

  if (keys.includes(word)) {
    totalScore += points;
    res.send({ success: true });
    console.log("totalScore: ", totalScore);
  } else {
    res.send({ success: false });
  }
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
