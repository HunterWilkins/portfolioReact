const express = require("express");
const PORT = process.env.PORT || 8080;
const path = require("path");
const router = express.Router();
const app = express();
const fs = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


app.get("/api/artwork", function(req, res) {
    console.log("Routing");
    const publicPath = path.join(__dirname, "/client/public/images/thumbnails");
    fs.readdir(publicPath, function(err, files) {
        if (err) {
            console.group(err);
            res.sendStatus(500);
        }
    
        else {
            let results = {
                thumbnails: files,
                source: publicPath
            };

            console.log("Successfully Reading Files");
            
            res.json(results);    
        }
    });
});


app.get("*", function(req, res) {
    console.log("Routing");
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));  
});



app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});