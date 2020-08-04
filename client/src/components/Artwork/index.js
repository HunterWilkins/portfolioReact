import React from "react";
import "./style.css";

function Artwork(props) {
    // No matter what component is loaded, the artwork is found in the background.
    // This ensures that the api call doesn't need to be called every time the
    // Artwork route is called.

    let style = {
        display: props.fullscreen ? "block" : "none"
    }

    console.log(props.description);
    return (
        <div>
            <figure id = "fullscreen" onClick = {() => {props.showFullScreen("null", false)}} style = {style}>
                <img src = {props.image}  alt = {props.image ? props.image.split("/")[5].replace(/=|.jpg|.png/g, " ") : "null"}/ >
                <p>{props.image ? props.image.split("/")[5].replace(/=|.jpg|.png/g, " ") : ""}</p>
                <p className = "description">{props.description}</p>
            </figure>

            <div id = "gallery">
                { props.genre !== "all" ? // Genre filter setup, currently will never match up. Will be expanded in future versions.
                
                props.artwork[props.genre].map(image => {
                    let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                    return (
                        <div className = "thumbnail">
                            <img src = {"/images/Artwork/" + props.genre + "/thumbnails/" + image + ""} alt = {"" + name + ""}></img>
                            <p className = "bottom">{name}</p>
                        </div>
                    )
                })
                
                :
                props.artwork.map(genre => {
                    return(
                        <div className = "genre">
                        <h2 className = "genre-name">{genre.name}</h2>
                        <hr></hr>
                        <div>
                        {genre.array.map(image => {
                            let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " "); // Cleans up file names
                            let imagePath = "/images/Artwork/" + genre.name +"/thumbnails/" + image;
                            let fullsizePath = "/images/Artwork/" + genre.name +"/full-size/" + image.replace(/-Thumbnail/g, "");
                            return (
                                <div className = "thumbnail" onClick = {() => {props.showFullScreen(fullsizePath, true)}}>
                                <img src = {imagePath} alt = {"" + name + ""}></img>
                                <p>{name}</p>
                                </div>
                            )
                        })}
                        </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default Artwork;