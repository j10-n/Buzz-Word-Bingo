const express = require("express", "localhost");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

let buzzwords = [];

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
    console.log(buzzwords);
    if (buzzwords.includes(word)) {
      res.send({ sucess: false });
    } else {
      buzzwords.push(word);
      res.send({ sucess: true });
    }
  });
//   .put(function(req, res) {})
//   .delete(function(req, res) {});

app.listen(PORT, () => console.log(`working on port ${PORT}`));
