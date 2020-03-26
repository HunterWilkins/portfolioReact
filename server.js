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

app.get("/api/rename/:specs", function(req, res) {
    if (req.params.specs === "equals") {
        let allFolders = ["Concept", "Hostage Situation", "Miscellaneous", "Romance"];
        allFolders.forEach(item => {
            fs.readdir(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails"), function(err, files) {
                files.forEach(file => {
                    let oldFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails/" + file);
                    let newFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails/" + file.replace(/ /g, "="));
                    fs.rename(oldFileName, newFileName, (err) => {console.log(err)}); 
                })
            });

            fs.readdir(path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size"), function(err, files) {
                files.forEach(file => {
                    let oldFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size/" + file);
                    let newFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size/" + file.replace(/ /g, "="));
                    fs.rename(oldFileName, newFileName, (err) => {console.log(err)}); 
                })
            });
        })
    }
})

app.post("/api/artwork", function(req, res) {
    console.log("Routing =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=");
    console.log(req.body);
    if (req.body.genre === "all") {
        let allGenres = ["Concept", "Hostage Situation", "Miscellaneous", "Romance"];

        let artNames = [];

        allGenres.forEach(item => {
            let thumbnailPath = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails");
            console.log(fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails")));
            
            artNames.push({
                name: item,
                fullscreen: fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size")),
                array: fs.readdirSync(thumbnailPath)
            });
        
        
        });
    

        res.send(artNames);
    }
 

});

app.get("/api/art/:name", function(req, res) {
    let allGenres = [
        "Concept", "Hostage Situation", "Miscellaneous", "Romance"
    ];

    let artNames = [];

    allGenres.forEach(item => {
        console.log(fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails")));
         
        artNames.push({
            name: item,
            array: fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails"))
        });
       
    });
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));  
});

app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});