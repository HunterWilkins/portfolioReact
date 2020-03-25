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
    app.use(express.static(path.join(__dirname, "/client/build")));
}


app.get("/api/artwork", function(req, res) {
    console.log("Routing =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=");
    const publicPath = path.resolve(__dirname, "images/thumbnails");
    const publicPath1 = path.resolve(__dirname, "/images/thumbnails");
    const publicPath2= path.resolve(__dirname, "/client/build/images/thumbnails");
    const publicPath3 = path.resolve(__dirname, "/client/build/public/images/thumbails");

    console.log(__dirname);
    console.log(path.resolve(__dirname, "/build/images/thumbnails"));


        fs.readdir(path.join(__dirname, "/client/public/images/thumbnails"), function(err, files) {
            if (err) {
                console.log(err);
                console.log("SOMETHING WENT WRONG")
                res.send("Check the Logs");
            }
        
            else {
                console.log("FINALLY READING THE FILES");
                console.log(files);
                res.send(files);
            }
        });
 

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));  
});

app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});