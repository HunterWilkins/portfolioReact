import React from "react";
import "./style.css";

function Artwork(props) {
    // No matter what component is loaded, the artwork is found in the background.
    // This ensures that the api call doesn't need to be called every time the
    // Artwork route is called.
    let descriptionBoxStyle = {
        // "top" : "100%",
        "bottom" : "-50px",
    }

    let descriptionBoxVisible = {
        // "top" : "initial",
        "bottom" : "0px",
    }

    let style = {
        display: props.fullscreen ? "block" : "none"
    }

    console.log(props.description);
    return (
        <div>
            <figure id = "fullscreen" onClick = { !props.isMobile ? () => {props.showFullScreen("null", false)} : ""} style = {style}>
                <img onClick = {props.isMobile ? () => {props.showFullScreen("null", false)} : ""} src = {props.image}  alt = {props.image ? props.image.split("/")[5].replace(/=|.jpg|.png/g, " ") : "null"}/ >
                <p id = "art-title">{props.image ? props.image.split("/")[5].replace(/=|.jpg|.png/g, " ") : ""}</p>
                {props.description !== "" ? <p id = "toggle-description"  style = {props.descriptionShown ? {"opacity" : "0"} : {"opacity" : "1"}} 
                    onMouseOver = {!props.isMobile ? () => props.showDescription() : ""} onClick = {props.isMobile ? () => props.showDescription() : ""}>Description</p> : null}
                
                {
                    props.description !== "" ? 
                     
                    <div id = "description-box" style = {props.descriptionShown ? {"opacity" : "1"} : {"opacity" : "0"}} 
                        
                        onMouseLeave = {props.descriptionShown && !props.isMobile ? () => props.showDescription() : ""}
                        onClick = {props.descriptionShown && props.isMobile ? () => props.showDescription() : ""}
                        >
                            <p className = "art-description">{props.description}</p> 

                    </div>
                    
                    :
                    
                    null

                }
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