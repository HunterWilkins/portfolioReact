import React, {Component} from "react";
import "./style.css";

const axios = require("axios");


function Artwork(props) {

    return (
        <div>
            <h1>Artwork</h1>
            <div id = "gallery">
                {props.artwork.map(image => {
                    let name = image.replace(/=|-Thumbnail|.jpg|.png/g, " ");
                    return (
                        <div className = "thumbnail">
                            <img src = {"/images/thumbnails/" + image + ""} alt = {"" + name + ""}></img>
                            <p className = "bottom">{name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Artwork;