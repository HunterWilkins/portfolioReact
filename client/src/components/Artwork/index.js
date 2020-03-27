import React, {Component} from "react";
import "./style.css";

const path = require("path");

const axios = require("axios");

function Artwork(props) {
    
    console.log(props);

    let style = {
        display: props.fullscreen ? "block" : "none",
    }

    return (
        <div>
            <figure id = "fullscreen" onClick = {() => {props.showFullScreen("null", false)}} style = {style}>
              
                <img src = {props.image}  alt = "fullscreen image"/ >
            </figure>

            <div id = "gallery">
                { props.genre !== "all" ? 
                
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
                            let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                            console.log(name);
                            console.log(genre.name);
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