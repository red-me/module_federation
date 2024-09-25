const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;

require('dotenv').config();

/*** Use Body Parser ***/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); // use cors

/** Controller Section **/
const api = require("./controllers/api");

app.use("/api/v1", api);

/** Remove headers for security purposes **/
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    next();
});


app.listen(port,() => console.log(`Listening on http://localhost:${port}`));
