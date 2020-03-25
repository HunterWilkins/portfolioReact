const express = require("express");
const PORT = process.env.PORT || 3001;
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


app.get("/api/artwork/:genre", function(req, res) {
    console.log("Routing =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=");
   
    if (req.params.genre === "all") {
        let allGenres = [
            "Concept", "Hostage Situation", "Miscellaneous", "Romance"
        ];

        let artNames = [
            
        ];

        allGenres.forEach(item => {
            console.log(fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails")));
             
            artNames.push({
                name: item,
                array: fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails"))
            });
           
        });

        res.send(artNames);


    }
 

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));  
});

app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});