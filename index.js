const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const pdf = require('html-pdf');

var jsonParser = bodyParser.json();

const port = process.env.PORT || 5002;

const app = express();

app.listen(port, () => {
    console.log("getStarted", new Date());
});
app.post("/get-base64", jsonParser, function (req, res) {

    var html = req.body.html;
    var options = {
        childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } },
        "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
        if(err) console.log(err);
        try {
            res.send(buffer.toString('base64'))
        } catch (error) {
            console.log(error);
        }
    })
});
