const express = require("express");
var bodyParser = require("body-parser");
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.get("/getSum", async function (request, response) {
  // let x = request.params.x;
  console.log()
  // let y = request.body.y;
  let x = 2;
  let y = 3;
  let z = x + y;
  response.send({ success: true, data: z })
});

app.listen(8002, function () {
  console.log("Server started at 8002...");
});
