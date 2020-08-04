const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const router = express.Router();
const app = express();
const fs = require("fs");
const { CLIENT_RENEG_WINDOW } = require("tls");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
}
// Renaming Functionality (previous iterations thought that spaces wouldn't work with image routes)
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

    else if (req.params.specs === "normal") {
        let allFolders = ["Concept", "Hostage Situation", "Miscellaneous", "Romance"];
        allFolders.forEach(item => {
            fs.readdir(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails"), function(err, files) {
                files.forEach(file => {
                    let oldFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails/" + file);
                    let newFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails/" + file.replace(/=/g, " "));
                    console.log(newFileName);
                    fs.rename(oldFileName, newFileName, (err) => {console.log(err)}); 
                })
            });

            fs.readdir(path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size"), function(err, files) {
                files.forEach(file => {
                    let oldFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size/" + file);
                    let newFileName = path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size/" + file.replace(/=/g, " "));
                    console.log(newFileName);
                    fs.rename(oldFileName, newFileName, (err) => {console.log(err)}); 
                });
            });
        })
    }

    res.sendStatus(200);
})
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

app.post("/api/artwork", function(req, res) {
    console.log("Routing =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=");
    console.log(req.body);
    if (req.body.genre === "all") {
        let allGenres = ["Concept", "Hostage Situation", "Miscellaneous", "Romance"];

        let artNames = [];

        // let newArtNames = [];

        allGenres.forEach(item => {
            let thumbnailPath = path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails");
            console.log(fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/thumbnails")));
            
            artNames.push({
                name: item,
                fullscreen: fs.readdirSync(path.join(__dirname, "/client/public/images/Artwork/" + item + "/full-size")),
                array: fs.readdirSync(thumbnailPath)
            });        
        });

        // console.log("ART NAMES NOW =/=/=//==/=/=/=/=/=//=/=/=/=/=/=/=/=/=/=/=/==/=/=/=/=/=/=/=/=/=/=/=/==/=/=/=/");

        // artNames.forEach(genre => {
        //     genre.fullscreen.forEach(art => {
        //         newArtNames.push(art);
        //     });        
        // });      
        // console.log(newArtNames);
        // newArtNames.forEach(item => {
        //     fs.writeFile(path.join(__dirname, "/client/public/documents/descriptions/" + item.replace(/jpg|png/, "txt")), "", function(err) {
        //         console.log(err);
        //     });
        // })

        // console.log("ART NAMES OVER=/=/=/=/=/=/=//=/=/=/=/=/==/=/=/=/=/=/=/=////=/=/=/=/=/=/=/=/=/=//=/=/=///==/")

        console.log(artNames);
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
});

app.get("/api/description/:image", function(req, res) {
    console.log("TARDY PILLBAGCHOMS");
    console.log(req.params.image);
    let description;
    // fs.readdirSync(path.join(__dirname, "/client/public/documents/descriptions/" + req.params.image + ".txt"));
    fs.readFile(path.join(__dirname, "/client/public/documents/descriptions/" + req.params.image + ".txt"), "utf8", (err, data) =>{
        console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH");
        console.log(data);
        res.send(data);
        console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH");
    })
    
})

//Post Functionality Tests (Unfinished)
// app.get("/api/documents", function(req, res) {
//     console.log(fs.readdirSync(path.join(__dirname, "/client/public/documents")));
//     res.send(fs.readdirSync(path.join(__dirname, "/client/public/documents")));
// });

// app.get("/api/document/:name", function(req, res) {
//     fs.readFile(path.join(__dirname, "/client/public/documents/" + req.params.name), "utf8", function(err, data) {
//         console.log(data);
//         res.send(data);
//     })
// })
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));  
});

app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});